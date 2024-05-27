const { DataTypes } = require('sequelize');
const db = require('../config/db.config'),
    sequelize = db.sequelize;
const Roles = require('../models/roleModel');

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

// Definir la asociación utilizando el método associate
Usuarios.associate = function(models) {
  Usuarios.belongsTo(models.Roles, { foreignKey: 'idRol' });
};

module.exports = Usuarios;