'use strict';
module.exports = (sequelize, DataTypes) => {
  const Estudiante = sequelize.define('Estudiante', {
    idEstudiante: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    apPaterno: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    apMaterno: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    direccion: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    fechaNacimiento: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'Estudiante',
    timestamps: false
  });

  Estudiante.associate = function(models) {
    Estudiante.hasMany(models.IngresoFamiliares, { foreignKey: 'idEstudiante' });
    Estudiante.hasMany(models.HistorialAcademico, { foreignKey: 'idEstudiante' });
    Estudiante.hasMany(models.Documentos, { foreignKey: 'idEstudiante' });
    Estudiante.hasMany(models.SolicitudesBecas, { foreignKey: 'idEstudiante' });
    Estudiante.hasMany(models.Usuarios, { foreignKey: 'idEstudiante' });
  };

  return Estudiante;
};
