const { express } = require('express');
const { router } = express.Router();
const { solicitudBecaController } = require('../controllers/solicitudBecaController');
const { validarNuevaSolicitud } = require('../middlewares/solicitudMiddleware');

// Ruta para obtener todas las solicitudes de becas
router.get('/solicitudes', solicitudBecaController.getAllSolicitudesBecas);

// Ruta para crear una nueva solicitud de beca
router.post('/solicitudes', validarNuevaSolicitud, solicitudBecaController.createSolicitudBeca);

// Ruta para obtener una solicitud de beca por su ID
router.get('/solicitudes/:id', solicitudBecaController.getSolicitudBecaById);

// Ruta para actualizar una solicitud de beca por su ID
router.put('/solicitudes/:id', solicitudBecaController.updateSolicitudBecaById);

// Ruta para eliminar una solicitud de beca por su ID
router.delete('/solicitudes/:id', solicitudBecaController.deleteSolicitudBecaById);

module.exports = router;
