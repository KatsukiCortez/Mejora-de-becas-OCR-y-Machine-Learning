const express = require('express');
const router = express.Router();
const documentosController = require('../controllers/documentoController');

// Rutas para documentos
router.get('/documentos', documentosController.getDocumentos); // Obtener todos los documentos
router.get('/documentos/:id', documentosController.getDocumentoById); // Obtener un documento por ID
router.post('/documentos', documentosController.createDocumento); // Crear un nuevo documento
router.put('/documentos/:id', documentosController.updateDocumentoById); // Actualizar un documento por ID
router.delete('/documentos/:id', documentosController.deleteDocumentoById); // Eliminar un documento por ID

module.exports = router;
