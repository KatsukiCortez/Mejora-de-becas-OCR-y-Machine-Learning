const { body, validationResult } = require('express-validator');

const manejoErrores = (err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  };
  
module.exports = manejoErrores;
  