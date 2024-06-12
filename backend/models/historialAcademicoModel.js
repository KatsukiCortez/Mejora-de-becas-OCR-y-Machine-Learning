'use strict';
module.exports = (sequelize, DataTypes) => {
  const HistorialAcademico = sequelize.define('HistorialAcademico', {
    idHistorial: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    promedio: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false
    },
    institucionEducativa: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    idEstudiante: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Estudiante',
        key: 'idEstudiante'
      }
    }
  }, {
    tableName: 'HistorialAcademico',
    timestamps: false
  });

  HistorialAcademico.associate = function(models) {
    HistorialAcademico.belongsTo(models.Estudiante, { foreignKey: 'idEstudiante' });
  };

  return HistorialAcademico;
};
