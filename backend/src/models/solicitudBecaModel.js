const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const { Estudiante } = require('./estudianteModel');

const SolicitudesBecas = sequelize.define('SolicitudesBecas', {
  idSolicitud: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  tipoBeca: {
    type: DataTypes.STRING(50)
  },
  estado: {
    type: DataTypes.STRING(20)
  },
  fechaSolicitud: {
    type: DataTypes.DATE
  }
});

SolicitudesBecas.belongsTo(Estudiante, { foreignKey: 'idEstudiante' });

module.exports = SolicitudesBecas;
