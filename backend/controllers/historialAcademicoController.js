const db = require('../models');

// Obtener todos los registros de historial académico
exports.getHistorialAcademico = async (req, res) => {
  try {
    const historial = await db.HistorialAcademico.findAll({
        include: db.Estudiante
    });
    res.json(historial);
  } catch (error) {
    console.error('Error fetching historial académico:', error.message);
    res.status(500).json({
      error: 'Server error',
      message: error.message,
      stack: error.stack
    });
  }
};

// Obtener un registro de historial académico por ID
exports.getHistorialById = async (req, res) => {
  try {
    const historial = await db.HistorialAcademico.findByPk(req.params.id,{
        include: db.Estudiante 
    });
    if (!historial) {
      return res.status(404).json({
        error: 'Not found',
        message: `Historial académico with ID ${req.params.id} not found`
      });
    }
    res.json(historial);
  } catch (error) {
    console.error(`Error fetching historial académico with ID ${req.params.id}:`, error.message);
    res.status(500).json({
      error: 'Server error',
      message: error.message,
      stack: error.stack
    });
  }
};

// Crear un nuevo registro de historial académico
exports.createHistorial = async (req, res) => {
    try {
      const nuevoHistorial = await db.HistorialAcademico.create(req.body);
      res.status(201).json(nuevoHistorial);
    } catch (error) {
      console.error('Error creating historial académico:', error.message);
      res.status(500).json({
        error: 'Server error',
        message: error.message,
        stack: error.stack
      });
    }
  };
  
  // Actualizar un registro de historial académico por ID
  exports.updateHistorialById = async (req, res) => {
    try {
      const historial = await db.HistorialAcademico.findByPk(req.params.id);
      if (!historial) {
        return res.status(404).json({
          error: 'Not found',
          message: `Historial académico with ID ${req.params.id} not found`
        });
      }
  
      await historial.update(req.body);
      res.json(historial);
    } catch (error) {
      console.error(`Error updating historial académico with ID ${req.params.id}:`, error.message);
      res.status(500).json({
        error: 'Server error',
        message: error.message,
        stack: error.stack
      });
    }
  };
  
  // Eliminar un registro de historial académico por ID
  exports.deleteHistorialById = async (req, res) => {
    try {
      const historial = await db.HistorialAcademico.findByPk(req.params.id);
      if (!historial) {
        return res.status(404).json({
          error: 'Not found',
          message: `Historial académico with ID ${req.params.id} not found`
        });
      }
  
      await historial.destroy();
      res.status(204).send(); // No content
    } catch (error) {
      console.error(`Error deleting historial académico with ID ${req.params.id}:`, error.message);
      res.status(500).json({
        error: 'Server error',
        message: error.message,
        stack: error.stack
      });
    }
  };
  