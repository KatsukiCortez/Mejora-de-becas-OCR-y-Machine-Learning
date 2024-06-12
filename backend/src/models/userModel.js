const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const { Roles } = require('./roleModel');

const Usuarios = sequelize.define('Usuarios', {
  idUsuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
});
Usuarios.belongsTo(Roles, { foreignKey: 'idRol' });

module.exports = Usuarios;
