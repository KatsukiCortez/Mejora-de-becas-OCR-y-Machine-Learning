const { validationResult } = require('express-validator');
const { Estudiante } = require('../models/estudianteModel');

// Obtener todos los estudiantes
const getAllEstudiantes = async (req, res) => {
  try {
    const estudiantes = await Estudiante.findAll();
    res.status(200).json(estudiantes);
  } catch (error) {
    console.error('Error al obtener todos los estudiantes:', error);
    res.status(500).json({ error: 'Error interno del servidor al obtener estudiantes' });
  }
};

// Crear un nuevo estudiante
const createEstudiante = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { nombre, apPaterno, apMaterno, direccion, fecha_nacimiento, id_ingreso_familiar, id_historial_academico, id_documento } = req.body;
  try {
    const nuevoEstudiante = await Estudiante.create({
      nombre,
      apPaterno,
      apMaterno,
      direccion,
      fecha_nacimiento,
      id_ingreso_familiar,
      id_historial_academico,
      id_documento,
    });
    res.status(201).json({ message: 'Estudiante creado correctamente', estudiante: nuevoEstudiante });
  } catch (error) {
    console.error('Error al crear estudiante:', error);
    res.status(500).json({ error: 'Error interno del servidor al crear estudiante' });
  }
};

// Obtener un estudiante por su ID
const getEstudianteById = async (req, res) => {
  const { id } = req.params;
  try {
    const estudiante = await Estudiante.findOne({ where: { id } });
    if (!estudiante) {
      res.status(404).json({ error: 'Estudiante no encontrado' });
      return;
    }
    res.status(200).json(estudiante);
  } catch (error) {
    console.error('Error al obtener estudiante por ID:', error);
    res.status(500).json({ error: 'Error interno del servidor al obtener estudiante por ID' });
  }
};

// Actualizar un estudiante por su ID
const updateEstudiante = async (req, res) => {
  const { id } = req.params;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { nombre, apPaterno, apMaterno, direccion, fechaNacimiento, idIngresoFamiliar, idHistorialAcademico, idDocumento } = req.body;

  try {
    let estudiante = await Estudiante.findOne({ where: { id } });
    if (!estudiante) {
      res.status(404).json({ error: 'Estudiante no encontrado' });
      return;
    }

    estudiante.nombre = nombre;
    estudiante.apPaterno = apPaterno;
    estudiante.apMaterno = apMaterno;
    estudiante.direccion = direccion;
    estudiante.fechaNacimiento = fechaNacimiento;
    estudiante.idIngresoFamiliar = idIngresoFamiliar;
    estudiante.idHistorialAcademico = idHistorialAcademico;
    estudiante.idDocumento = idDocumento;

    await estudiante.save();

    res.status(200).json({ message: 'Estudiante actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar estudiante:', error);
    res.status(500).json({ error: 'Error interno del servidor al actualizar estudiante' });
  }
};

// Eliminar un estudiante por su ID
const deleteEstudiante = async (req, res) => {
  const { id } = req.params;
  try {
    const estudiante = await Estudiante.findOne({ where: { id } });
    if (!estudiante) {
      res.status(404).json({ error: 'Estudiante no encontrado' });
      return;
    }

    await estudiante.destroy();
    res.status(200).json({ message: 'Estudiante eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar estudiante:', error);
    res.status(500).json({ error: 'Error interno del servidor al eliminar estudiante' });
  }
};

module.exports = {
    getAllEstudiantes,
    createEstudiante,
    getEstudianteById,
    updateEstudiante,
    deleteEstudiante
  };