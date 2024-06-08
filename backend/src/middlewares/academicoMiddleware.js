const { body, validationResult } = require('express-validator');

// Middleware de validación para la creación y actualización de historiales académicos
const validateHistorialAcademico = [
  body('promedio').isNumeric().withMessage('El promedio debe ser un número'),
  body('institucion_educativa').notEmpty().withMessage('La institución educativa es requerida'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateHistorialAcademico;
