const express = require('express');
const router = express.Router();
const { evaluarSolicitud } = require('../controllers/tensorflowController');

// Ruta para evaluar la solicitud de beca
router.post('/evaluar/:idEstudiante', evaluarSolicitud);

module.exports = router;
