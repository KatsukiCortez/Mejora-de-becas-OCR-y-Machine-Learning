'use strict';
module.exports = (sequelize, DataTypes) => {
  const Documentos = sequelize.define('Documentos', {
    idDocumento: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    resultadoAnalisisML: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    comentarios: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    fecha: {
      type: DataTypes.DATE,
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
    tableName: 'Documentos',
    timestamps: false
  });

  Documentos.associate = function(models) {
    Documentos.belongsTo(models.Estudiante, { foreignKey: 'idEstudiante' });
  };

  return Documentos;
};
