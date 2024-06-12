'use strict';
module.exports = (sequelize, DataTypes) => {
  const ComunicacionesUsuarios = sequelize.define('ComunicacionesUsuarios', {
    idComunicacion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    idUsuario: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Usuarios',
        key: 'idUsuario'
      }
    },
    mensaje: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    fechaEnvio: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'ComunicacionesUsuarios',
    timestamps: false
  });

  ComunicacionesUsuarios.associate = function(models) {
    ComunicacionesUsuarios.belongsTo(models.Usuarios, { foreignKey: 'idUsuario' });
  };

  return ComunicacionesUsuarios;
};
