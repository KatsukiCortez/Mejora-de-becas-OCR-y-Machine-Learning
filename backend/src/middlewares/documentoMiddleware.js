const { body, validationResult } = require('express-validator');

// Middleware de validación para documentos
const validarDocumento = [
  body('estado_documento').notEmpty().withMessage('El estado del documento es requerido'),
  body('resultado_analisis_ml').notEmpty().withMessage('El resultado del análisis es requerido'),
  body('comentarios').optional().isString().withMessage('Los comentarios deben ser una cadena de texto'),
  body('fecha').optional().isISO8601().toDate().withMessage('La fecha debe tener el formato ISO8601 (YYYY-MM-DD)'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validarDocumento;