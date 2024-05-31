const db = require('../models');

// Obtener todas las solicitudes de becas con información de Estudiante
exports.getSolicitudesBecas = async (req, res) => {
    try {
      const solicitudes = await db.SolicitudesBecas.findAll({
        include: db.Estudiante // Incluir la información de Estudiante relacionada
      });
      res.json(solicitudes);
    } catch (error) {
      console.error('Error fetching solicitudes de becas:', error.message);
      res.status(500).json({
        error: 'Server error',
        message: error.message,
        stack: error.stack
      });
    }
  };
  

// Obtener una solicitud de beca por ID con información de Estudiante
exports.getSolicitudBecaById = async (req, res) => {
    try {
      const solicitud = await db.SolicitudesBecas.findByPk(req.params.id, {
        include: db.Estudiante // Incluir la información de Estudiante relacionada
      });
      if (!solicitud) {
        return res.status(404).json({
          error: 'Not found',
          message: `Solicitud de beca with ID ${req.params.id} not found`
        });
      }
      res.json(solicitud);
    } catch (error) {
      console.error(`Error fetching solicitud de beca with ID ${req.params.id}:`, error.message);
      res.status(500).json({
        error: 'Server error',
        message: error.message,
        stack: error.stack
      });
    }
  };
  

// Crear una nueva solicitud de beca
exports.createSolicitudBeca = async (req, res) => {
  try {
    const newSolicitud = await db.SolicitudesBecas.create(req.body);
    res.status(201).json(newSolicitud);
  } catch (error) {
    console.error('Error creating solicitud de beca:', error.message);
    res.status(500).json({
      error: 'Server error',
      message: error.message,
      stack: error.stack
    });
  }
};

// Actualizar una solicitud de beca por ID
exports.updateSolicitudBecaById = async (req, res) => {
  try {
    const solicitud = await db.SolicitudesBecas.findByPk(req.params.id);
    if (!solicitud) {
      return res.status(404).json({
        error: 'Not found',
        message: `Solicitud de beca with ID ${req.params.id} not found`
      });
    }

    await solicitud.update(req.body);
    res.json(solicitud);
  } catch (error) {
    console.error(`Error updating solicitud de beca with ID ${req.params.id}:`, error.message);
    res.status(500).json({
      error: 'Server error',
      message: error.message,
      stack: error.stack
    });
  }
};

// Eliminar una solicitud de beca por ID
exports.deleteSolicitudBecaById = async (req, res) => {
  try {
    const solicitud = await db.SolicitudesBecas.findByPk(req.params.id);
    if (!solicitud) {
      return res.status(404).json({
        error: 'Not found',
        message: `Solicitud de beca with ID ${req.params.id} not found`
      });
    }

    await solicitud.destroy();
    res.status(204).send(); // No content
  } catch (error) {
    console.error(`Error deleting solicitud de beca with ID ${req.params.id}:`, error.message);
    res.status(500).json({
      error: 'Server error',
      message: error.message,
      stack: error.stack
    });
  }
};
