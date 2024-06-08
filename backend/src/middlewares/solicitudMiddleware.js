const { body, validationResult } = require('express-validator');

// Middleware de validación para crear una nueva solicitud de beca
const validarNuevaSolicitud = [
  body('nombre').isString().withMessage('El nombre debe ser una cadena de texto'),
  body('apellido').isString().withMessage('El apellido debe ser una cadena de texto'),
  body('correo').isEmail().withMessage('El correo electrónico debe ser válido'),
  body('telefono').isMobilePhone().withMessage('El teléfono debe ser válido'),
  body('documentoIdentidad').isString().withMessage('El documento de identidad debe ser una cadena de texto'),
  body('montoSolicitado').isNumeric().withMessage('El monto solicitado debe ser un número'),
  body('fechaSolicitud').isISO8601().toDate().withMessage('La fecha de solicitud debe tener el formato ISO8601'),
  body('estado').isIn(['pendiente', 'aprobada', 'rechazada']).withMessage('El estado debe ser pendiente, aprobada o rechazada'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validarNuevaSolicitud;