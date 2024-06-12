const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarioController');

router.get('/usuarios', usuariosController.getUsuarios);
router.get('/usuarios/:id', usuariosController.getUsuarioById);
router.post('/usuarios', usuariosController.createUsuario);
router.put('/usuarios/:id', usuariosController.updateUsuarioById);
router.delete('/usuarios/:id', usuariosController.deleteUsuarioById);

module.exports = router;
