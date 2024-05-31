'use strict';
module.exports = (sequelize, DataTypes) => {
  const HistorialAcceso = sequelize.define('HistorialAcceso', {
    idHistorial: {
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
    fechaHora: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    tipoAccion: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    tableName: 'HistorialAcceso',
    timestamps: false
  });

  HistorialAcceso.associate = function(models) {
    HistorialAcceso.belongsTo(models.Usuarios, { foreignKey: 'idUsuario' });
  };

  return HistorialAcceso;
};
