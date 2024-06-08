const { express } = require('express');
const { router } = express.Router();
const { historialAccesoController } = require('../controllers/historialAccesoController');
const { body } = require('express-validator');
const { validateHistorialAcceso } = require('../middlewares/accesoMiddleware');

// Middleware de validación para la creación y actualización de historiales de acceso
router.post('/historial-acceso', validateHistorialAcceso, historialAccesoController.createHistorialAcceso);

// Ruta para obtener todos los registros del historial de acceso
router.get('/historial-acceso', historialAccesoController.getAllHistorialAcceso);

// Ruta para obtener un registro del historial de acceso por su ID
router.get('/historial-acceso/:id', historialAccesoController.getHistorialAccesoById);

// Ruta para eliminar un registro del historial de acceso por su ID
router.delete('/historial-acceso/:id', historialAccesoController.deleteHistorialAccesoById);

module.exports = router;
