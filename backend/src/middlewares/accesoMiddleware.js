const { body, validationResult } = require('express-validator');

const validateHistorialAcceso = [
    body('id_usuario').isNumeric().withMessage('El ID de usuario debe ser un número entero'),
    body('tipo_accion').isIn(['inicio_sesion', 'cierre_sesion', 'cambio_contraseña']).withMessage('Tipo de acción no válido'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];


module.exports = validateHistorialAcceso;