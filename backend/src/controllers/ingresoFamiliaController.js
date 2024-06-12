const { validationResult } = require('express-validator');
const { IngresoFamiliar } = require('../models/ingresoFamiliar');

// Crear un nuevo registro de ingreso familiar
const createIngresoFamiliar = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { nombre, ingresoMensual } = req.body;

  try {
    const nuevoIngresoFamiliar = await IngresoFamiliar.create({
      nombre,
      ingresoMensual
    });

    res.status(201).json({ message: 'Ingreso familiar creado correctamente', ingresoFamiliar: nuevoIngresoFamiliar });
  } catch (error) {
    console.error('Error al crear el ingreso familiar:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Obtener todos los registros de ingreso familiar
const getAllIngresosFamiliares = async (req, res) => {
  try {
    const ingresosFamiliares = await IngresoFamiliar.find();
    res.status(200).json(ingresosFamiliares);
  } catch (error) {
    console.error('Error al obtener los ingresos familiares:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Obtener un registro de ingreso familiar por su ID
const getIngresoFamiliarById = async (req, res) => {
  const { id } = req.params;

  try {
    const ingresoFamiliar = await IngresoFamiliar.findById(id);
    if (!ingresoFamiliar) {
      res.status(404).json({ error: 'Ingreso familiar no encontrado' });
      return;
    }
    res.status(200).json(ingresoFamiliar);
  } catch (error) {
    console.error('Error al obtener el ingreso familiar por ID:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Eliminar un registro de ingreso familiar por su ID
const deleteIngresoFamiliarById = async (req, res) => {
  const { id } = req.params;

  try {
    const ingresoFamiliarEliminado = await IngresoFamiliar.findByIdAndDelete(id);
    if (!ingresoFamiliarEliminado) {
      res.status(404).json({ error: 'Ingreso familiar no encontrado' });
      return;
    }
    res.status(200).json({ message: 'Ingreso familiar eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el ingreso familiar por ID:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
    createIngresoFamiliar,
    getAllIngresosFamiliares,
    getIngresoFamiliarById,
    deleteIngresoFamiliarById
  };