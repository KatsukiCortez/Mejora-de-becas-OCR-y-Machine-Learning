const { express } = require('express');
const { router } = express.Router();
const { ingresoFamiliarController } = require('../controllers/ingresoFamiliaController');
const { validateIngresoFamiliar } = require('../middlewares/familiarMiddleware');

// Ruta para crear un nuevo registro de ingreso familiar
router.post('/ingresos-familiares', validateIngresoFamiliar, ingresoFamiliarController.createIngresoFamiliar);

// Ruta para obtener todos los registros de ingreso familiar
router.get('/ingresos-familiares', ingresoFamiliarController.getAllIngresosFamiliares);

// Ruta para obtener un registro de ingreso familiar por su ID
router.get('/ingresos-familiares/:id', ingresoFamiliarController.getIngresoFamiliarById);

// Ruta para eliminar un registro de ingreso familiar por su ID
router.delete('/ingresos-familiares/:id', ingresoFamiliarController.deleteIngresoFamiliarById);

module.exports = router;
