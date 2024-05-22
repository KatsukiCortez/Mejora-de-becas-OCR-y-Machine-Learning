const { express } = require('express');
const { documentoController } = require('../controllers/comunicacionController');
const { validarDocumento } = require('../middlewares/documentoMiddleware');

const router = express.Router();

// Ruta para obtener todos los documentos
router.get('/documentos', documentoController.getAllDocumentos);

// Ruta para crear un nuevo documento
router.post('/documentos', validarDocumento, documentoController.createDocumento);

// Ruta para obtener un documento por su ID
router.get('/documentos/:id', documentoController.getDocumentoById);

// Ruta para actualizar un documento por su ID
router.put('/documentos/:id', validarDocumento, documentoController.updateDocumento);

// Ruta para eliminar un documento por su ID
router.delete('/documentos/:id', documentoController.deleteDocumento);

module.exports = router;
