const { express } = require('express');
const { router } = express.Router();
const { rolesController } = require('../controllers/rolesController');
const { validarRol } = require('../middlewares/rolMiddleware')

//Ruta para crear un rol
router.post('/roles', validarRol, rolesController.createRol);

//Ruta para obtener todos los roles
router.get('/roles', rolesController.getAllRoles);

//Ruta para obtener rol por ID
router.get('/roles/:id', rolesController.getRolById);

//Ruta para eliminar rol por ID
router.delete('/roles/:id', rolesController.deleteRolById);

module.exports = router;
