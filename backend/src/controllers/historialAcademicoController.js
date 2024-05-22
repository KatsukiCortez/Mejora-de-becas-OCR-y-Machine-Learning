const { validationResult } = require('express-validator');
const { HistorialAcademico } = require('../models/historialAcademicoModel'); 

// Obtener todos los historiales académicos
const getAllHistorialesAcademicos = async (req, res) => {
  try {
    const historiales = await HistorialAcademico.find();
    res.status(200).json(historiales);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener historiales académicos' });
  }
};

// Obtener un historial académico por su ID
const getHistorialAcademicoById = async (req, res) => {
  const { id } = req.params;
  try {
    const historial = await HistorialAcademico.findById(id);
    if (!historial) {
      return res.status(404).json({ error: 'Historial académico no encontrado' });
    }
    res.status(200).json(historial);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el historial académico por ID' });
  }
};

// Agregar un nuevo historial académico
const createHistorialAcademico = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { promedio, institucionEducativa } = req.body;
  try {
    const nuevoHistorial = new HistorialAcademico({
      promedio,
      institucionEducativa,
    });
    await nuevoHistorial.save();
    res.status(201).json({ message: 'Historial académico creado correctamente', historial: nuevoHistorial });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el historial académico' });
  }
};

// Actualizar un historial académico por su ID
const updateHistorialAcademico = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { promedio, institucionEducativa } = req.body;
  try {
    const historialActualizado = await HistorialAcademico.findByIdAndUpdate(id, {
      promedio,
      institucionEducativa,
    }, { new: true });
    if (!historialActualizado) {
      return res.status(404).json({ error: 'Historial académico no encontrado' });
    }
    res.status(200).json({ message: 'Historial académico actualizado correctamente', historial: historialActualizado });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el historial académico' });
  }
};

// Eliminar un historial académico por su ID
const deleteHistorialAcademico = async (req, res) => {
  const { id } = req.params;
  try {
    const historialEliminado = await HistorialAcademico.findByIdAndDelete(id);
    if (!historialEliminado) {
      return res.status(404).json({ error: 'Historial académico no encontrado' });
    }
    res.status(200).json({ message: 'Historial académico eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el historial académico' });
  }
};


module.exports = {
  getAllHistorialesAcademicos,
  getHistorialAcademicoById,
  createHistorialAcademico,
  updateHistorialAcademico,
  deleteHistorialAcademico
};