const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const projekt = sequelize.define(
    'projekt',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.TEXT,
      },

      status: {
        type: DataTypes.INTEGER,
      },

      url: {
        type: DataTypes.TEXT,
      },

      apikey: {
        type: DataTypes.TEXT,
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  projekt.associate = (db) => {
    db.projekt.belongsToMany(db.kunde, {
      as: 'kunden_id',
      foreignKey: {
        name: 'projekt_kunden_idId',
      },
      constraints: false,
      through: 'projektKunden_idKunde',
    });

    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.projekt.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.projekt.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return projekt;
};
