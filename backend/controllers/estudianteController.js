const db = require('../models');

// Obtener todos los estudiantes
exports.getEstudiantes = async (req, res) => {
  try {
    // Consulta todos los estudiantes
    const estudiantes = await db.Estudiante.findAll();
    res.json(estudiantes);
  } catch (error) {
    console.error('Error al obtener los estudiantes:', error.message);
    res.status(500).json({
      error: 'Error del servidor',
      message: error.message,
      stack: error.stack
    });
  }
};

// Obtener un estudiante por ID
exports.getEstudianteById = async (req, res) => {
  try {
    // Busca un estudiante por su ID
    const estudiante = await db.Estudiante.findByPk(req.params.id);
    if (!estudiante) {
      return res.status(404).json({
        error: 'No encontrado',
        message: `Estudiante con ID ${req.params.id} no encontrado`
      });
    }
    res.json(estudiante);
  } catch (error) {
    console.error(`Error al obtener el estudiante con ID ${req.params.id}:`, error.message);
    res.status(500).json({
      error: 'Error del servidor',
      message: error.message,
      stack: error.stack
    });
  }
};

// Crear un nuevo estudiante
exports.createEstudiante = async (req, res) => {
  try {
    const { nombre, apPaterno, apMaterno, direccion, fechaNacimiento } = req.body; // Obtener solo los campos necesarios del cuerpo de la solicitud
    // Crear el nuevo estudiante con los campos proporcionados
    const newEstudiante = await db.Estudiante.create({ nombre, apPaterno, apMaterno, direccion, fechaNacimiento });
    res.status(201).json(newEstudiante);
  } catch (error) {
    console.error('Error al crear el estudiante:', error.message);
    res.status(500).json({
      error: 'Error del servidor',
      message: error.message,
      stack: error.stack
    });
  }
};

// Actualizar un estudiante por ID
exports.updateEstudianteById = async (req, res) => {
  try {
    // Busca un estudiante por su ID para actualizarlo con los datos proporcionados en el cuerpo de la solicitud
    const estudiante = await db.Estudiante.findByPk(req.params.id);
    if (!estudiante) {
      return res.status(404).json({
        error: 'No encontrado',
        message: `Estudiante con ID ${req.params.id} no encontrado`
      });
    }

    await estudiante.update(req.body);
    res.json(estudiante);
  } catch (error) {
    console.error(`Error al actualizar el estudiante con ID ${req.params.id}:`, error.message);
    res.status(500).json({
      error: 'Error del servidor',
      message: error.message,
      stack: error.stack
    });
  }
};

// Eliminar un estudiante por ID
exports.deleteEstudianteById = async (req, res) => {
  try {
    // Busca un estudiante por su ID y lo elimina
    const estudiante = await db.Estudiante.findByPk(req.params.id);
    if (!estudiante) {
      return res.status(404).json({
        error: 'No encontrado',
        message: `Estudiante con ID ${req.params.id} no encontrado`
      });
    }

    await estudiante.destroy();
    res.status(204).send(); // Sin contenido
  } catch (error) {
    console.error(`Error al eliminar el estudiante con ID ${req.params.id}:`, error.message);
    res.status(500).json({
      error: 'Error del servidor',
      message: error.message,
      stack: error.stack
    });
  }
};
