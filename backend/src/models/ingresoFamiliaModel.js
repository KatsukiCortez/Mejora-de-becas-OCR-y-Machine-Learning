const { DataTypes } = require('sequelize');
const db = require('../config/db.config'),
    sequelize = db.sequelize;

const IngresoFamiliar = sequelize.define('IngresoFamiliares', {
  idIngresoFamiliar: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ingresosMensuales: {
    type: DataTypes.DECIMAL(10, 2)
  },
  numMiembros_familia: {
    type: DataTypes.INTEGER
  }
});

module.exports = IngresoFamiliar;
