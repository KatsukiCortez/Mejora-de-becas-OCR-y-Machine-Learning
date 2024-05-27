/* require('dotenv').config();
const { express } = require('express');
const { sequelize } = require('./src/config/database.js');
const { config } = require('./src/config/config.js');
const { manejoErrores } = require('./src/middlewares/manejoErrores'); 
const { comunicacion } = require('./src/routes/comunicacionRoute');
const { documento } = require('./src/routes/documentoRoute');
const { estudiante } = require('./src/routes/estudianteRoute');
const { academico } = require('./src/routes/historialAcademicoRoute');
const { acceso } = require('./src/routes/historialAccesoRoute');
const { familia } = require('./src/routes/ingresoFamiliaRoute');
const { role } = require('./src/routes/roleRoute');
const { seguimiento } = require('./src/routes/seguimientoRoute');
const { solicitud } = require('./src/routes/solicitudBecaRoute');
const { user } = require('./src/routes/userRoute');

const app = express();

// Middleware para analizar el cuerpo de las solicitudes como JSON
app.use(express.json());

// Middleware de manejo de errores global
app.use(manejoErrores);

// Prefijo '/octi' para todas las rutas de predefinidas
app.use('/octi', comunicacion);
app.use('/octi', documento);
app.use('/octi', estudiante);
app.use('/octi', academico);
app.use('/octi', acceso);
app.use('/octi', familia);
app.use('/octi', role);
app.use('/octi', seguimiento);
app.use('/octi', solicitud);
app.use('/octi', user); 

app.get("/api", (req, res) => {
  res.json({ message: "Hola desde el servidor!" });
});

sequelize.authenticate()
  .then(() => {
    console.log('Conectado a la base de datos');
    return sequelize.sync();
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
  });

const PORT = (config.PORT || 3000);
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
 */

const express = require('express');
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require('cors');

const db = require('./src/models/db')

const app = express();

var corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); /* bodyParser.urlencoded() is deprecated */

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

app.post('/login', (req, res)=>{
  // NECESITAMOS OBTENER LAS VARIABLES DEL FORMULARIO
  const sentloginUserName = req.body.LoginUserName
  const sentLoginPassword = req.body.LoginPassword

  // VAMOS A CREAR UN QUERY PARA INSERTAR A LA BASE DE DATOS TABLA USUARIOS
  const SQL = 'SELECT * FROM users WHERE username = ? && password = ?'  // VAMOS A ENTRAR LOS VALORES ENTRELAZADSOS A LAS VARIABLES
  const Values = [sentloginUserName, sentLoginPassword]

  // QUERY A EJECUTAR
  db.query(SQL, Values, (err, results)=>{
      if (err) {
        res.send({error: err})
      } 
      if (results.length > 0) {
        res.send(results)
      }
      else{
        res.send({message: 'Las credenciales no coinciden'})
      }
  })
})

/* require("./app/routes/tutorial.routes.js")(app); */

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});