const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const { Usuarios } = require('./userModel');

const HistorialAcceso = sequelize.define('HistorialAcceso', {
  idHistorial: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fechaHora: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  tipoAccion: {
    type: DataTypes.STRING(50)
  }
});

HistorialAcceso.belongsTo(Usuarios, { foreignKey: 'idUsuario' });

module.exports = HistorialAcceso;
