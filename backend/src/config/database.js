// config/database.js
const { Sequelize } = require('sequelize');
const config = require('./config.json');

const sequelize = new Sequelize(config.DB_NAME, config.DB_USER, config.DB_PASSWORD, {
  host: config.DB_HOST,
  dialect: 'mysql',
});

sequelize.authenticate()
  .then(() => {
    console.log('Conexión exitosa con la base de datos MySQL');
  })
  .catch((error) => {
    console.error('Error al conectar con la base de datos:', error);
  });

module.exports = sequelize;
