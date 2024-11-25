const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class KundeDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const kunde = await db.kunde.create(
      {
        id: data.id || undefined,

        name: data.name || null,
        vorname: data.vorname || null,
        strasse: data.strasse || null,
        plz: data.plz || null,
        ort: data.ort || null,
        land: data.land || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await kunde.setUser(data.user || [], {
      transaction,
    });

    return kunde;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const kundeData = data.map((item, index) => ({
      id: item.id || undefined,

      name: item.name || null,
      vorname: item.vorname || null,
      strasse: item.strasse || null,
      plz: item.plz || null,
      ort: item.ort || null,
      land: item.land || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const kunde = await db.kunde.bulkCreate(kundeData, { transaction });

    // For each item created, replace relation files

    return kunde;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const kunde = await db.kunde.findByPk(id, {}, { transaction });

    await kunde.update(
      {
        name: data.name || null,
        vorname: data.vorname || null,
        strasse: data.strasse || null,
        plz: data.plz || null,
        ort: data.ort || null,
        land: data.land || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await kunde.setUser(data.user || [], {
      transaction,
    });

    return kunde;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const kunde = await db.kunde.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of kunde) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of kunde) {
        await record.destroy({ transaction });
      }
    });

    return kunde;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const kunde = await db.kunde.findByPk(id, options);

    await kunde.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await kunde.destroy({
      transaction,
    });

    return kunde;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const kunde = await db.kunde.findOne({ where }, { transaction });

    if (!kunde) {
      return kunde;
    }

    const output = kunde.get({ plain: true });

    output.user = await kunde.getUser({
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
        model: db.users,
        as: 'user',
        through: filter.user
          ? {
              where: {
                [Op.or]: filter.user.split('|').map((item) => {
                  return { ['Id']: Utils.uuid(item) };
                }),
              },
            }
          : null,
        required: filter.user ? true : null,
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
          [Op.and]: Utils.ilike('kunde', 'name', filter.name),
        };
      }

      if (filter.vorname) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('kunde', 'vorname', filter.vorname),
        };
      }

      if (filter.strasse) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('kunde', 'strasse', filter.strasse),
        };
      }

      if (filter.plz) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('kunde', 'plz', filter.plz),
        };
      }

      if (filter.ort) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('kunde', 'ort', filter.ort),
        };
      }

      if (filter.land) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('kunde', 'land', filter.land),
        };
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
          count: await db.kunde.count({
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
      : await db.kunde.findAndCountAll({
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
          Utils.ilike('kunde', 'id', query),
        ],
      };
    }

    const records = await db.kunde.findAll({
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
