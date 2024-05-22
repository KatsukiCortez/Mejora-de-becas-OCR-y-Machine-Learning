const { express } = require('express');
const { router } = express.Router();
const { historialAcademicoController } = require('../controllers/historialAcademicoController');
const { validateHistorialAcademico } = require('../middlewares/academicoMiddleware');

//Ruta para obtener todas los historiales academicos
router.get('/historiales', historialAcademicoController.getAllHistorialesAcademicos);

//Ruta para obtener los historiales academicos por ID
router.get('/historiales/:id', historialAcademicoController.getHistorialAcademicoById);

//Ruta para obtener crear los historiales academicos 
router.post('/historiales', validateHistorialAcademico, historialAcademicoController.createHistorialAcademico);

//Ruta para actualizar los historiales academicos por ID
router.put('/historiales/:id', validateHistorialAcademico, historialAcademicoController.updateHistorialAcademico);

//Ruta para eliminar los historiales academicos por ID
router.delete('/historiales/:id', historialAcademicoController.deleteHistorialAcademico);

module.exports = router;
