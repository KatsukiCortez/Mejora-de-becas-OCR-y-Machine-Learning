const express = require('express');
const router = express.Router();
const historialAccesoController = require('../controllers/historialAccesoController');

// Rutas para historial de acceso
router.get('/historial-acceso', historialAccesoController.getHistorialAcceso); // Obtener todos los registros de historial de acceso
router.get('/historial-acceso/buscar', historialAccesoController.buscarHistorialPorTipoAccion); // Buscar registros de historial de acceso por tipo de acción

module.exports = router;
