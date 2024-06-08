const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const { Usuarios } = require('./userModel');

const ComunicacionesUsuarios = sequelize.define('ComunicacionesUsuarios', {
  idComunicacion: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  mensaje: {
    type: DataTypes.TEXT
  },
  fechaEnvio: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

ComunicacionesUsuarios.belongsTo(Usuarios, { foreignKey: 'idUsuario' });

module.exports = ComunicacionesUsuarios;
