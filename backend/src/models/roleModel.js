const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database'); 

const Roles = sequelize.define('Roles', {
  idRol: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement:true
  },
  rol: {
    type: DataTypes.STRING(20),
    unique: true,
  },
});

module.exports = Roles;
