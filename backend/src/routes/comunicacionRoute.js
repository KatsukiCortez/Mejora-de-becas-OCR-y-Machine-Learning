const { express } = require('express');
const { router } = express.Router();
const { comunicacionController } = require('../controllers/comunicacionController');
const { validarNuevaComunicacion } = require('../middlewares/comunicaionMiddleware');

// Ruta para obtener todas las comunicaciones de un usuario
router.get('/comunicaciones/:idUsuario', comunicacionController.getComunicacionesUsuario);

// Ruta para crear una nueva comunicación de usuario
router.post('/comunicaciones', validarNuevaComunicacion, comunicacionController.createComunicacionUsuario);

// Ruta para eliminar una comunicación de usuario por su ID
router.delete('/comunicaciones/:idComunicacion', comunicacionController.deleteComunicacionUsuario);


module.exports = router;
