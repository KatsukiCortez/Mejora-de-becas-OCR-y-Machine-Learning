const { body, validationResult } = require('express-validator');

// Middleware de validación para crear una nueva comunicación
const validarNuevaComunicacion = [
    body('idUsuario').isNumeric().withMessage('El ID del usuario debe ser un número'),
    body('mensaje').notEmpty().withMessage('El mensaje es requerido'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];

  module.exports = validarNuevaComunicacion;