const express = require('express');
const router = express.Router();
const comunicacionesUsuariosController = require('../controllers/comunicacionController');

// Rutas para comunicaciones de usuarios
router.get('/comunicaciones-usuarios', comunicacionesUsuariosController.getComunicacionesUsuarios); // Obtener todas las comunicaciones de usuarios
router.get('/comunicaciones-usuarios/:id', comunicacionesUsuariosController.getComunicacionUsuarioById); // Obtener una comunicación de usuario por ID
router.post('/comunicaciones-usuarios', comunicacionesUsuariosController.createComunicacionUsuario); // Crear una nueva comunicación de usuario
router.put('/comunicaciones-usuarios/:id', comunicacionesUsuariosController.updateComunicacionUsuarioById); // Actualizar una comunicación de usuario por ID
router.delete('/comunicaciones-usuarios/:id', comunicacionesUsuariosController.deleteComunicacionUsuarioById); // Eliminar una comunicación de usuario por ID

module.exports = router;
