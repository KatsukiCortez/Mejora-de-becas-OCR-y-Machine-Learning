const db = require('../models');

// Obtener todos los registros de historial académico
exports.getHistorialAcademico = async (req, res) => {
  try {
    // Consulta todos los registros de historial académico incluyendo información de Estudiante relacionada
    const historial = await db.HistorialAcademico.findAll({
        include: db.Estudiante
    });
    res.json(historial);
  } catch (error) {
    console.error('Error al obtener el historial académico:', error.message);
    res.status(500).json({
      error: 'Error del servidor',
      message: error.message,
      stack: error.stack
    });
  }
};

// Obtener un registro de historial académico por ID
exports.getHistorialById = async (req, res) => {
  try {
    // Busca un registro de historial académico por su ID e incluye información de Estudiante relacionada
    const historial = await db.HistorialAcademico.findByPk(req.params.id,{
        include: db.Estudiante 
    });
    if (!historial) {
      return res.status(404).json({
        error: 'No encontrado',
        message: `Historial académico con ID ${req.params.id} no encontrado`
      });
    }
    res.json(historial);
  } catch (error) {
    console.error(`Error al obtener el historial académico con ID ${req.params.id}:`, error.message);
    res.status(500).json({
      error: 'Error del servidor',
      message: error.message,
      stack: error.stack
    });
  }
};

// Crear un nuevo registro de historial académico
exports.createHistorial = async (req, res) => {
  try {
    // Crea un nuevo registro de historial académico utilizando los datos proporcionados en el cuerpo de la solicitud
    const nuevoHistorial = await db.HistorialAcademico.create(req.body);
    res.status(201).json(nuevoHistorial);
  } catch (error) {
    console.error('Error al crear el historial académico:', error.message);
    res.status(500).json({
      error: 'Error del servidor',
      message: error.message,
      stack: error.stack
    });
  }
};

// Actualizar un registro de historial académico por ID
exports.updateHistorialById = async (req, res) => {
  try {
    // Busca un registro de historial académico por su ID para actualizarlo con los datos proporcionados en el cuerpo de la solicitud
    const historial = await db.HistorialAcademico.findByPk(req.params.id);
    if (!historial) {
      return res.status(404).json({
        error: 'No encontrado',
        message: `Historial académico con ID ${req.params.id} no encontrado`
      });
    }

    await historial.update(req.body);
    res.json(historial);
  } catch (error) {
    console.error(`Error al actualizar el historial académico con ID ${req.params.id}:`, error.message);
    res.status(500).json({
      error: 'Error del servidor',
      message: error.message,
      stack: error.stack
    });
  }
};

// Eliminar un registro de historial académico por ID
exports.deleteHistorialById = async (req, res) => {
  try {
    // Busca un registro de historial académico por su ID y lo elimina
    const historial = await db.HistorialAcademico.findByPk(req.params.id);
    if (!historial) {
      return res.status(404).json({
        error: 'No encontrado',
        message: `Historial académico con ID ${req.params.id} no encontrado`
      });
    }

    await historial.destroy();
    res.status(204).send(); // Sin contenido
  } catch (error) {
    console.error(`Error al eliminar el historial académico con ID ${req.params.id}:`, error.message);
    res.status(500).json({
      error: 'Error del servidor',
      message: error.message,
      stack: error.stack
    });
  }
};
