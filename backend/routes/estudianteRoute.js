const express = require('express');
const router = express.Router();
const estudianteController = require('../controllers/estudianteController');

router.get('/estudiante', estudianteController.getEstudiantes);
router.get('/estudiante/:id', estudianteController.getEstudianteById);
router.post('/estudiante', estudianteController.createEstudiante);
router.put('/estudiante/:id', estudianteController.updateEstudianteById);
router.delete('/estudiante/:id', estudianteController.deleteEstudianteById);

module.exports = router;