const express = require('express');
const router = express.Router();
const historialAcademicoController = require('../controllers/historialAcademicoController');

// Rutas para historial académico
router.get('/historial-academico', historialAcademicoController.getHistorialAcademico); // Obtener todos los registros de historial académico
router.get('/historial-academico/:id', historialAcademicoController.getHistorialById); // Obtener un registro de historial académico por ID
router.post('/historial-academico', historialAcademicoController.createHistorial); // Crear un nuevo registro de historial académico
router.put('/historial-academico/:id', historialAcademicoController.updateHistorialById); // Actualizar un registro de historial académico por ID
router.delete('/historial-academico/:id', historialAcademicoController.deleteHistorialById); // Eliminar un registro de historial académico por ID


module.exports = router;
