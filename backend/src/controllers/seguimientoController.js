const { validationResult } = require('express-validator');
const { SeguimientoBecas } = require('../models/seguimientoBecasModel');
const { SolicitudesBecas } = require('../models/solicitudBecaModel');

// Crear un nuevo seguimiento de beca
const createSeguimientoBecas = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { idSolicitud, fechaInicio, fechaFin, estadoActual, comentarios } = req.body;
  
    try {
      // Verificar si la solicitud con el idSolicitud especificado existe
      const solicitudExistente = await SolicitudesBecas.findOne({ where: { idSolicitud } });
      if (!solicitudExistente) {
        return res.status(404).json({ error: 'La solicitud de beca especificada no existe' });
      }
  
      // Crear el nuevo seguimiento de becas
      const nuevoSeguimiento = await SeguimientoBecas.create({
        idSolicitud,
        fechaInicio,
        fechaFin,
        estadoActual,
        comentarios
      });
  
      res.status(201).json({ message: 'Seguimiento de becas creado correctamente', seguimiento: nuevoSeguimiento });
    } catch (error) {
      console.error('Error al crear el seguimiento de becas:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };
  

// Obtener un seguimiento de beca por su ID
const getSeguimientoBecaById = async (req, res) => {
  const { id } = req.params;

  try {
    const seguimiento = await SeguimientoBecas.findByPk(id);
    if (!seguimiento) {
      res.status(404).json({ error: 'Seguimiento de beca no encontrado' });
      return;
    }
    res.status(200).json(seguimiento);
  } catch (error) {
    console.error('Error al obtener el seguimiento de beca por ID:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Actualizar un seguimiento de beca por su ID
const updateSeguimientoBecaById = async (req, res) => {
  const { id } = req.params;
  const { fechaInicio, fechaFin, estadoActual, comentarios } = req.body;

  try {
    const seguimiento = await SeguimientoBecas.findByPk(id);
    if (!seguimiento) {
      res.status(404).json({ error: 'Seguimiento de beca no encontrado' });
      return;
    }

    await seguimiento.update({
      fechaInicio,
      fechaFin,
      estadoActual,
      comentarios
    });

    res.status(200).json({ message: 'Seguimiento de beca actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar el seguimiento de beca por ID:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Eliminar un seguimiento de beca por su ID
const deleteSeguimientoBecaById = async (req, res) => {
  const { id } = req.params;

  try {
    const seguimientoEliminado = await SeguimientoBecas.destroy({ where: { idSeguimiento: id } });
    if (!seguimientoEliminado) {
      res.status(404).json({ error: 'Seguimiento de beca no encontrado' });
      return;
    }
    res.status(200).json({ message: 'Seguimiento de beca eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el seguimiento de beca por ID:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
    getSeguimientoBecaById,
    createSeguimientoBecas,
    updateSeguimientoBecaById,
    deleteSeguimientoBecaById
  };