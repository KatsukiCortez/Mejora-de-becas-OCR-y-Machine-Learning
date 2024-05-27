const { DataTypes } = require('sequelize');
const db = require('../config/db.config'),
    sequelize = db.sequelize;
const { SolicitudesBecas } = require('./solicitudBecaModel');

const SeguimientoBecas = sequelize.define('SeguimientoBecas', {
  idSeguimiento: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fechaInicio: {
    type: DataTypes.DATE
  },
  fechaFin: {
    type: DataTypes.DATE
  },
  estadoActual: {
    type: DataTypes.STRING(20)
  },
  comentarios: {
    type: DataTypes.TEXT
  }
});

SeguimientoBecas.belongsTo(SolicitudesBecas, { foreignKey: 'idSolicitud' });

module.exports = SeguimientoBecas;
