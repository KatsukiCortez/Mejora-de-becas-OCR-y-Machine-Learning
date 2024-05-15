const { express } = require('express');
const { router } = express.Router();
const { seguimientoBecaController } = require('../controllers/seguimientoBecaController');
const { validarNuevoSeguimiento } = require('../middlewares/seguimientoMiddleware');

// Ruta para obtener todos los seguimientos de becas
router.get('/seguimientos', seguimientoBecaController.getAllSeguimientosBecas);

// Ruta para crear un nuevo seguimiento de beca
router.post('/seguimientos', validarNuevoSeguimiento, seguimientoBecaController.createSeguimientoBeca);

// Ruta para obtener un seguimiento de beca por su ID
router.get('/seguimientos/:id', seguimientoBecaController.getSeguimientoBecaById);

// Ruta para eliminar un seguimiento de beca por su ID
router.delete('/seguimientos/:id', seguimientoBecaController.deleteSeguimientoBecaById);

module.exports = router;
