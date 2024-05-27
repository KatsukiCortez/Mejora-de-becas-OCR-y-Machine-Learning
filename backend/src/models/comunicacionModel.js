const { DataTypes } = require('sequelize');
const db = require('../config/db.config'),
    sequelize = db.sequelize;
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


ComunicacionesUsuarios.associate = function(models) {
  ComunicacionesUsuarios.belongsTo(models.Usuarios, { foreignKey: 'idUsuario' });
};


module.exports = ComunicacionesUsuarios;
