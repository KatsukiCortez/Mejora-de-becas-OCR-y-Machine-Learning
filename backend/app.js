require('dotenv').config();
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
