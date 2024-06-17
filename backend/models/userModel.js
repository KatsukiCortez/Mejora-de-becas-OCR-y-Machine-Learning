'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const Usuarios = sequelize.define('Usuarios', {
    idUsuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    idRol: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Roles',
        key: 'idRol'
      }
    },
    idEstudiante: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Estudiante',
        key: 'idEstudiante'
      }
    }
  }, {
    tableName: 'Usuarios',
    timestamps: false,
    hooks: {
      beforeCreate: async (usuario) => {
        if (usuario.password) {
          const salt = await bcrypt.genSalt(10);
          usuario.password = await bcrypt.hash(usuario.password, salt);
        }
      },
      beforeUpdate: async (usuario) => {
        if (usuario.password) {
          const salt = await bcrypt.genSalt(10);
          usuario.password = await bcrypt.hash(usuario.password, salt);
        }
      }
    }
  });

  Usuarios.associate = function(models) {
    Usuarios.belongsTo(models.Roles, { foreignKey: 'idRol' });
    Usuarios.belongsTo(models.Estudiante, { foreignKey: 'idEstudiante' });
    Usuarios.hasMany(models.HistorialAcceso, { foreignKey: 'idUsuario' });
  };

  return Usuarios;
};
