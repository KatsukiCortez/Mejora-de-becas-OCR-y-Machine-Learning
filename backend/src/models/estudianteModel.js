const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const { IngresoFamiliar } = require('./ingresoFamiliaModel');
const { HistorialAcademico } = require('./historialAcademicoModel');
const { Documentos } = require('./documentoModel');

const Estudiante = sequelize.define('Estudiante', {
  idEstudiante: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(50)
  },
  apPaterno: {
    type: DataTypes.STRING(50)
  },
  apMaterno: {
    type: DataTypes.STRING(50)
  },
  direccion: {
    type: DataTypes.STRING(100)
  },
  fechaNacimiento: {
    type: DataTypes.DATE
  }
});

Estudiante.belongsTo(IngresoFamiliar, { foreignKey: 'idIngresoFamiliar' });
Estudiante.belongsTo(HistorialAcademico, { foreignKey: 'idHistorialAcademico' });
Estudiante.belongsTo(Documentos, { foreignKey: 'idDocumento' });

module.exports = Estudiante;
