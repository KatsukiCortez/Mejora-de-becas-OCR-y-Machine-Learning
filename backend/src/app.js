const { express } = require('express');
const { config } = require('./config.json');
const { manejoErrores } = require('./middlewares/manejoErrores'); 
const { comunicacion } = require('./routes/comunicacionRoute');
const { documento } = require('./routes/documentoRoute');
const { estudiante } = require('./routes/estudianteRoute');
const { academico } = require('./routes/historialAcademicoRoute');
const { acceso } = require('./routes/historialAccesoRoute');
const { familia } = require('./routes/ingresoFamiliaRoute');
const { role } = require('./routes/roleRoute');
const { seguimiento } = require('./routes/seguimientoRoute');
const { solicitud } = require('./routes/solicitudBecaRoute');
const { user } = require('./routes/userRoute');

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


const PORT = (config.PORT || 3000);
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
