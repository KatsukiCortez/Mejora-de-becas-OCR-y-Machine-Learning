const { DataTypes } = require('sequelize');
const db = require('../config/db.config'),
    sequelize = db.sequelize;

const Documentos = sequelize.define('Documentos', {
  idDocumento: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  estadoDocumento: {
    type: DataTypes.STRING(20)
  },
  resultadoAnalisisML: {
    type: DataTypes.STRING(255)
  },
  comentarios: {
    type: DataTypes.TEXT
  },
  fecha: {
    type: DataTypes.DATE
  }
});

module.exports = Documentos;
