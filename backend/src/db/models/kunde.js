const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const kunde = sequelize.define(
    'kunde',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.TEXT,
      },

      vorname: {
        type: DataTypes.TEXT,
      },

      strasse: {
        type: DataTypes.TEXT,
      },

      plz: {
        type: DataTypes.TEXT,
      },

      ort: {
        type: DataTypes.TEXT,
      },

      land: {
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

  kunde.associate = (db) => {
    db.kunde.belongsToMany(db.users, {
      as: 'user',
      foreignKey: {
        name: 'kunde_userId',
      },
      constraints: false,
      through: 'kundeUserUsers',
    });

    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.kunde.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.kunde.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return kunde;
};
