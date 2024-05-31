'use strict';
module.exports = (sequelize, DataTypes) => {
  const IngresoFamiliares = sequelize.define('IngresoFamiliares', {
    idIngresoFamiliar: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    ingresosMensuales: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    numMiembrosFamilia: {
      type: DataTypes.INTEGER,
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
    tableName: 'IngresoFamiliares',
    timestamps: false
  });

  IngresoFamiliares.associate = function(models) {
    IngresoFamiliares.belongsTo(models.Estudiante, { foreignKey: 'idEstudiante' });
  };

  return IngresoFamiliares;
};
