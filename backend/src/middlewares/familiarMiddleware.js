const { body, validationResult } = require('express-validator');

// Middleware de validación para la creación de ingresos familiares
const validateIngresoFamiliar = [
  body('nombre').notEmpty().withMessage('El nombre es requerido'),
  body('ingresoMensual').isNumeric().withMessage('El ingreso mensual debe ser un número'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateIngresoFamiliar;
