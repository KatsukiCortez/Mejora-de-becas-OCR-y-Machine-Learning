'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const dbConfig = require('../config/db.config.js'); // Importar la configuración de la base de datos
const db = {};

// Configurar Sequelize con la configuración de la base de datos
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
});

// Leer todos los archivos en el directorio actual (excluyendo este archivo) y cargarlos como modelos
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    // Cada archivo de modelo exporta una función
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Ejecutar asociaciones de modelos si existen
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize; // Agregar instancia de sequelize al objeto db
db.Sequelize = Sequelize; // Agregar clase Sequelize al objeto db

module.exports = db;
