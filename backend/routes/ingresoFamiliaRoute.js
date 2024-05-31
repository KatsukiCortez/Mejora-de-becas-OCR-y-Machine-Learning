const express = require('express');
const router = express.Router();
const ingresoFamiliaresController = require('../controllers/ingresoFamiliaController');

router.get('/ingresos-familiares', ingresoFamiliaresController.getIngresosFamiliares);
router.get('/ingresos-familiares/:id', ingresoFamiliaresController.getIngresoFamiliarById);
router.post('/ingresos-familiares', ingresoFamiliaresController.createIngresoFamiliar);
router.put('/ingresos-familiares/:id', ingresoFamiliaresController.updateIngresoFamiliarById);
router.delete('/ingresos-familiares/:id', ingresoFamiliaresController.deleteIngresoFamiliarById);

module.exports = router;
