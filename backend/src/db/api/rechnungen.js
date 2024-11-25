const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class RechnungenDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const rechnungen = await db.rechnungen.create(
      {
        id: data.id || undefined,

        invoice_id: data.invoice_id || null,
        projekt_id: data.projekt_id || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    return rechnungen;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const rechnungenData = data.map((item, index) => ({
      id: item.id || undefined,

      invoice_id: item.invoice_id || null,
      projekt_id: item.projekt_id || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const rechnungen = await db.rechnungen.bulkCreate(rechnungenData, {
      transaction,
    });

    // For each item created, replace relation files

    return rechnungen;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const rechnungen = await db.rechnungen.findByPk(id, {}, { transaction });

    await rechnungen.update(
      {
        invoice_id: data.invoice_id || null,
        projekt_id: data.projekt_id || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    return rechnungen;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const rechnungen = await db.rechnungen.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of rechnungen) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of rechnungen) {
        await record.destroy({ transaction });
      }
    });

    return rechnungen;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const rechnungen = await db.rechnungen.findByPk(id, options);

    await rechnungen.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await rechnungen.destroy({
      transaction,
    });

    return rechnungen;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const rechnungen = await db.rechnungen.findOne({ where }, { transaction });

    if (!rechnungen) {
      return rechnungen;
    }

    const output = rechnungen.get({ plain: true });

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
    let include = [];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.invoice_idRange) {
        const [start, end] = filter.invoice_idRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            invoice_id: {
              ...where.invoice_id,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            invoice_id: {
              ...where.invoice_id,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.projekt_idRange) {
        const [start, end] = filter.projekt_idRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            projekt_id: {
              ...where.projekt_id,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            projekt_id: {
              ...where.projekt_id,
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
          count: await db.rechnungen.count({
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
      : await db.rechnungen.findAndCountAll({
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
          Utils.ilike('rechnungen', 'id', query),
        ],
      };
    }

    const records = await db.rechnungen.findAll({
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
