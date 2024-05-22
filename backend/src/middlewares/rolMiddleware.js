const { body, validationResult } = require('express-validator');

const validarRol = [
    body('rol').notEmpty().withMessage('El nombre del rol es requerido'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
];

module.exports = validarRol;