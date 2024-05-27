const { DataTypes } = require('sequelize');
const db = require('../config/db.config'),
    sequelize = db.sequelize;

const HistorialAcademico = sequelize.define('HistorialAcademico', {
  idHistorial: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  promedio: {
    type: DataTypes.DECIMAL(5, 2)
  },
  institucionEducativa: {
    type: DataTypes.STRING(100)
  }
});

module.exports = HistorialAcademico;
