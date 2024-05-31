const express = require('express');
const router = express.Router();
const rolesController = require('../controllers/roleController');

router.get('/role', rolesController.getRoles);
router.get('/role/:id', rolesController.getRoleById);
router.post('/role', rolesController.createRole);
router.put('/role/:id', rolesController.updateRoleById);
router.delete('/role/:id', rolesController.deleteRoleById);

module.exports = router;