const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class ProjektDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const projekt = await db.projekt.create(
      {
        id: data.id || undefined,

        name: data.name || null,
        status: data.status || null,
        url: data.url || null,
        apikey: data.apikey || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await projekt.setKunden_id(data.kunden_id || [], {
      transaction,
    });

    return projekt;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const projektData = data.map((item, index) => ({
      id: item.id || undefined,

      name: item.name || null,
      status: item.status || null,
      url: item.url || null,
      apikey: item.apikey || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const projekt = await db.projekt.bulkCreate(projektData, { transaction });

    // For each item created, replace relation files

    return projekt;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const projekt = await db.projekt.findByPk(id, {}, { transaction });

    await projekt.update(
      {
        name: data.name || null,
        status: data.status || null,
        url: data.url || null,
        apikey: data.apikey || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await projekt.setKunden_id(data.kunden_id || [], {
      transaction,
    });

    return projekt;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const projekt = await db.projekt.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of projekt) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of projekt) {
        await record.destroy({ transaction });
      }
    });

    return projekt;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const projekt = await db.projekt.findByPk(id, options);

    await projekt.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await projekt.destroy({
      transaction,
    });

    return projekt;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const projekt = await db.projekt.findOne({ where }, { transaction });

    if (!projekt) {
      return projekt;
    }

    const output = projekt.get({ plain: true });

    output.kunden_id = await projekt.getKunden_id({
      transaction,
    });

    return output;
  }

  static async findAll(filter, options) {
    const limit = filter.limit || 0;
    let offset = 0;
    const currentPage = +filter.page;

    offset = currentPage * limit;

    const orderBy = null;

    const transaction = (options && options.transaction) || undefined;
    let where = {};
    let include = [
      {
        model: db.kunde,
        as: 'kunden_id',
        through: filter.kunden_id
          ? {
              where: {
                [Op.or]: filter.kunden_id.split('|').map((item) => {
                  return { ['Id']: Utils.uuid(item) };
                }),
              },
            }
          : null,
        required: filter.kunden_id ? true : null,
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.name) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('projekt', 'name', filter.name),
        };
      }

      if (filter.url) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('projekt', 'url', filter.url),
        };
      }

      if (filter.apikey) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('projekt', 'apikey', filter.apikey),
        };
      }

      if (filter.statusRange) {
        const [start, end] = filter.statusRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            status: {
              ...where.status,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            status: {
              ...where.status,
              [Op.lte]: end,
            },
          };
        }
      }

      if (
        filter.active === true ||
        filter.active === 'true' ||
        filter.active === false ||
        filter.active === 'false'
      ) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    let { rows, count } = options?.countOnly
      ? {
          rows: [],
          count: await db.projekt.count({
            where,
            include,
            distinct: true,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            order:
              filter.field && filter.sort
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction,
          }),
        }
      : await db.projekt.findAndCountAll({
          where,
          include,
          distinct: true,
          limit: limit ? Number(limit) : undefined,
          offset: offset ? Number(offset) : undefined,
          order:
            filter.field && filter.sort
              ? [[filter.field, filter.sort]]
              : [['createdAt', 'desc']],
          transaction,
        });

    //    rows = await this._fillWithRelationsAndFilesForRows(
    //      rows,
    //      options,
    //    );

    return { rows, count };
  }

  static async findAllAutocomplete(query, limit) {
    let where = {};

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike('projekt', 'id', query),
        ],
      };
    }

    const records = await db.projekt.findAll({
      attributes: ['id', 'id'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['id', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.id,
    }));
  }
};
