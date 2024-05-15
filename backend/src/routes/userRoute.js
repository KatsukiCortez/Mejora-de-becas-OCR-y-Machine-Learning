const { express } = require('express');
const { userController } = require('../controllers/userController');
const { manejoErrores } = require('../middlewares/manejoErrores');

const router = express.Router();

// Ruta para obtener todos los usuarios
router.get('/users', userController.getAllUsers);

// Ruta para obtener un usuario por su ID
router.get('/users/:id', userController.getUserById);

// Ruta para agregar un nuevo usuario
router.post('/users', userController.addUser);

// Ruta para actualizar información de un usuario existente
router.put('/users/:id', userController.updateUser);

// Ruta para eliminar un usuario por su ID
router.delete('/users/:id', userController.deleteUserById);

// Middleware de manejo de errores
router.use(manejoErrores);

module.exports = router;
