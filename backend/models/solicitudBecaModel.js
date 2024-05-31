'use strict';
module.exports = (sequelize, DataTypes) => {
  const SolicitudesBecas = sequelize.define('SolicitudesBecas', {
    idSolicitud: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    idEstudiante: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Estudiante',
        key: 'idEstudiante'
      }
    },
    tipoBeca: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    estado: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    fechaSolicitud: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'SolicitudesBecas',
    timestamps: false
  });

  SolicitudesBecas.associate = function(models) {
    SolicitudesBecas.belongsTo(models.Estudiante, { foreignKey: 'idEstudiante' });
    SolicitudesBecas.hasMany(models.SeguimientoBecas, { foreignKey: 'idSolicitud' });
  };

  return SolicitudesBecas;
};
