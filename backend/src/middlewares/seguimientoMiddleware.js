const { body, validationResult } = require('express-validator');

// Middleware de validación para crear un nuevo seguimiento de beca
const validarNuevoSeguimiento = [
  body('idSolicitud').isNumeric().withMessage('El ID de la solicitud debe ser un número entero'),
  body('fechaInicio').isISO8601().toDate().withMessage('La fecha de inicio debe tener el formato ISO8601'),
  body('fechaFin').isISO8601().toDate().withMessage('La fecha de fin debe tener el formato ISO8601'),
  body('estadoActual').isString().withMessage('El estado actual debe ser una cadena de texto'),
  body('comentarios').optional().isString().withMessage('Los comentarios deben ser una cadena de texto'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validarNuevoSeguimiento;