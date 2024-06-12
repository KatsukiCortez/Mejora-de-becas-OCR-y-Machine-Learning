'use strict';
module.exports = (sequelize, DataTypes) => {
  const SeguimientoBecas = sequelize.define('SeguimientoBecas', {
    idSeguimiento: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    idSolicitud: {
      type: DataTypes.INTEGER,
      references: {
        model: 'SolicitudesBecas',
        key: 'idSolicitud'
      }
    },
    fechaInicio: {
      type: DataTypes.DATE,
      allowNull: false
    },
    fechaFin: {
      type: DataTypes.DATE,
      allowNull: true
    },
    estadoActual: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    comentarios: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'SeguimientoBecas',
    timestamps: false
  });

  SeguimientoBecas.associate = function(models) {
    SeguimientoBecas.belongsTo(models.SolicitudesBecas, { foreignKey: 'idSolicitud' });
  };

  return SeguimientoBecas;
};
