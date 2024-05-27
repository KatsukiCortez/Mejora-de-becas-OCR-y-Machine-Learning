const { DataTypes } = require('sequelize');
const db = require('../config/db.config'),
    sequelize = db.sequelize;

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
