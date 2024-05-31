const express = require('express');
const router = express.Router();
const solicitudesBecasController = require('../controllers/solicitudController');

router.get('/solicitudes-becas', solicitudesBecasController.getSolicitudesBecas);
router.get('/solicitudes-becas/:id', solicitudesBecasController.getSolicitudBecaById);
router.post('/solicitudes-becas', solicitudesBecasController.createSolicitudBeca);
router.put('/solicitudes-becas/:id', solicitudesBecasController.updateSolicitudBecaById);
router.delete('/solicitudes-becas/:id', solicitudesBecasController.deleteSolicitudBecaById);

module.exports = router;
