const { validationResult } = require('express-validator');
const { SolicitudBeca } = require('../models/solicitudBecaModel');

// Crear una nueva solicitud de beca
const createSolicitudBeca = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { nombreEstudiante, tipoBeca, montoSolicitado } = req.body;

  try {
    // Verificar si ya existe una solicitud con el nombre del estudiante
    const solicitudExistente = await SolicitudBeca.findOne({ where: { nombreEstudiante } });
    if (solicitudExistente) {
      return res.status(400).json({ error: 'Ya existe una solicitud para este estudiante' });
    }

    // Crear la nueva solicitud de beca
    const nuevaSolicitud = await SolicitudBeca.create({
      nombreEstudiante,
      tipoBeca,
      montoSolicitado
    });

    res.status(201).json({ message: 'Solicitud de beca creada correctamente', solicitud: nuevaSolicitud });
  } catch (error) {
    console.error('Error al crear la solicitud de beca:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Obtener todas las solicitudes de becas
const getAllSolicitudesBecas = async (req, res) => {
  try {
    const solicitudes = await SolicitudBeca.findAll();
    res.status(200).json(solicitudes);
  } catch (error) {
    console.error('Error al obtener las solicitudes de becas:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Obtener una solicitud de beca por su ID
const getSolicitudBecaById = async (req, res) => {
  const { id } = req.params;

  try {
    const solicitud = await SolicitudBeca.findByPk(id);
    if (!solicitud) {
      res.status(404).json({ error: 'Solicitud de beca no encontrada' });
      return;
    }
    res.status(200).json(solicitud);
  } catch (error) {
    console.error('Error al obtener la solicitud de beca por ID:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Eliminar una solicitud de beca por su ID
const deleteSolicitudBecaById = async (req, res) => {
  const { id } = req.params;

  try {
    const solicitudEliminada = await SolicitudBeca.destroy({ where: { id } });
    if (!solicitudEliminada) {
      res.status(404).json({ error: 'Solicitud de beca no encontrada' });
      return;
    }
    res.status(200).json({ message: 'Solicitud de beca eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar la solicitud de beca por ID:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};


module.exports = {
    createSolicitudBeca,
    getSolicitudBecaById,
    getAllSolicitudesBecas,
    deleteSolicitudBecaById
  };