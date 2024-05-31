'use strict';
module.exports = (sequelize, DataTypes) => {
  const Roles = sequelize.define('Roles', {
    idRol: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    rol: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true
    }
  }, {
    tableName: 'Roles',
    timestamps: false
  });

  Roles.associate = function(models) {
    Roles.hasMany(models.Usuarios, { foreignKey: 'idRol' });
  };

  return Roles;
};
