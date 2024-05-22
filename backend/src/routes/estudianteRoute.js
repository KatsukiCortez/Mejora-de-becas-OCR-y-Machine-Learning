const { express } = require('express');
const { body } = require('express-validator');
const { estudianteController } = require('../controllers/estudianteController');

const router = express.Router();

// Middleware de validación para datos de estudiante
const validarDatosEstudiante = [
  body('nombre').notEmpty().withMessage('El nombre es requerido'),
  body('apPaterno').notEmpty().withMessage('El apellido paterno es requerido'),
  body('apMaterno').notEmpty().withMessage('El apellido materno es requerido'),
  body('direccion').notEmpty().withMessage('La dirección es requerida'),
  body('fecha_nacimiento').isISO8601().toDate().withMessage('La fecha de nacimiento debe tener el formato ISO8601 (YYYY-MM-DD)'),
  body('id_ingreso_familiar').isNumeric().withMessage('El ID de ingreso familiar debe ser un número'),
  body('id_historial_academico').isNumeric().withMessage('El ID de historial académico debe ser un número'),
  body('id_documento').isNumeric().withMessage('El ID de documento debe ser un número'),
];

// Ruta para obtener todos los estudiantes
router.get('/estudiantes', estudianteController.getAllEstudiantes);

// Ruta para obtener un estudiante por su ID
router.get('/estudiantes/:id', estudianteController.getEstudianteById);

// Ruta para agregar un nuevo estudiante
router.post('/estudiantes', validarDatosEstudiante, estudianteController.createEstudiante);

// Ruta para actualizar información de un estudiante existente
router.put('/estudiantes/:id', validarDatosEstudiante, estudianteController.updateEstudiante);

// Ruta para eliminar un estudiante por su ID
router.delete('/estudiantes/:id', estudianteController.deleteEstudiante);

module.exports = router;
