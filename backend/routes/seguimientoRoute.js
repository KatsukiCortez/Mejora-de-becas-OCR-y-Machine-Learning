const express = require('express');
const router = express.Router();
const seguimientoBecasController = require('../controllers/seguimientoController');

router.get('/seguimientos-becas', seguimientoBecasController.getSeguimientosBecas);
router.get('/seguimientos-becas/:id', seguimientoBecasController.getSeguimientoBecaById);
router.post('/seguimientos-becas', seguimientoBecasController.createSeguimientoBeca);
router.put('/seguimientos-becas/:id', seguimientoBecasController.updateSeguimientoBecaById);
router.delete('/seguimientos-becas/:id', seguimientoBecasController.deleteSeguimientoBecaById);

module.exports = router;
