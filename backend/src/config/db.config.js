/* // config/database.js
require('dotenv').config();
var { Sequelize } = require('sequelize');

var sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USERNAME, 
  process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mysql',
});

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;


sequelize.authenticate()
  .then(() => {
    console.log('Conexión exitosa con la base de datos MySQL');
  })
  .catch((error) => {
    console.error('Error al conectar con la base de datos:', error);
  });


module.exports = db;

 */
module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "",
  DB: "octidb"
};