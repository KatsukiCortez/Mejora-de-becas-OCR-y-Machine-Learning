const db = require('../models');

// Obtener todos los estudiantes
exports.getEstudiantes = async (req, res) => {
  try {
    const estudiantes = await db.Estudiante.findAll();
    res.json(estudiantes);
  } catch (error) {
    console.error('Error fetching estudiantes:', error.message);
    res.status(500).json({
      error: 'Server error',
      message: error.message,
      stack: error.stack
    });
  }
};

// Obtener un estudiante por ID
exports.getEstudianteById = async (req, res) => {
  try {
    const estudiante = await db.Estudiante.findByPk(req.params.id);
    if (!estudiante) {
      return res.status(404).json({
        error: 'Not found',
        message: `Estudiante with ID ${req.params.id} not found`
      });
    }
    res.json(estudiante);
  } catch (error) {
    console.error(`Error fetching estudiante with ID ${req.params.id}:`, error.message);
    res.status(500).json({
      error: 'Server error',
      message: error.message,
      stack: error.stack
    });
  }
};

// Crear un nuevo estudiante
// Crear un nuevo estudiante
exports.createEstudiante = async (req, res) => {
    try {
      const { nombre, apPaterno, apMaterno, direccion, fechaNacimiento } = req.body; // Obtener solo los campos necesarios del cuerpo de la solicitud
      const newEstudiante = await db.Estudiante.create({ nombre, apPaterno, apMaterno, direccion, fechaNacimiento }); // Crear el nuevo estudiante con los campos proporcionados
  
      res.status(201).json(newEstudiante);
    } catch (error) {
      console.error('Error creating estudiante:', error.message);
      res.status(500).json({
        error: 'Server error',
        message: error.message,
        stack: error.stack
      });
    }
  };
  

// Actualizar un estudiante por ID
exports.updateEstudianteById = async (req, res) => {
  try {
    const estudiante = await db.Estudiante.findByPk(req.params.id);
    if (!estudiante) {
      return res.status(404).json({
        error: 'Not found',
        message: `Estudiante with ID ${req.params.id} not found`
      });
    }

    await estudiante.update(req.body);
    res.json(estudiante);
  } catch (error) {
    console.error(`Error updating estudiante with ID ${req.params.id}:`, error.message);
    res.status(500).json({
      error: 'Server error',
      message: error.message,
      stack: error.stack
    });
  }
};

// Eliminar un estudiante por ID
exports.deleteEstudianteById = async (req, res) => {
  try {
    const estudiante = await db.Estudiante.findByPk(req.params.id);
    if (!estudiante) {
      return res.status(404).json({
        error: 'Not found',
        message: `Estudiante with ID ${req.params.id} not found`
      });
    }

    await estudiante.destroy();
    res.status(204).send(); // No content
  } catch (error) {
    console.error(`Error deleting estudiante with ID ${req.params.id}:`, error.message);
    res.status(500).json({
      error: 'Server error',
      message: error.message,
      stack: error.stack
    });
  }
};
