const { Sequelize, DataTypes } = require('sequelize');
const config = require('../set');
const db = config.DATABASE;

const sequelize = new Sequelize(db, {
  dialect: 'postgres',
  ssl: true,
  protocol: 'postgres',
  dialectOptions: {
    native: true,
    ssl: { require: true, rejectUnauthorized: false },
  },
  logging: false,
});

const Sudo = sequelize.define('Sudo', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
}, {
  tableName: 'sudo',
  timestamps: false,
});

(async () => {
  await Sudo.sync();
  console.log("Table 'Sudo' synchronisée avec succès.");
})();

module.exports = { Sudo };
