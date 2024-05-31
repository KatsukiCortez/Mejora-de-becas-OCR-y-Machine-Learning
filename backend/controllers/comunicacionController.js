const db = require('../models');

// Obtener todas las comunicaciones de usuarios
exports.getComunicacionesUsuarios = async (req, res) => {
  try {
    const comunicaciones = await db.ComunicacionesUsuarios.findAll({
        include: [
            {
              model: db.Usuarios, // Incluir información de SolicitudesBecas
              include: db.Estudiante // Incluir información de Estudiante relacionada con SolicitudesBecas
            }
          ]
    });
    res.json(comunicaciones);
  } catch (error) {
    console.error('Error fetching comunicaciones de usuarios:', error.message);
    res.status(500).json({
      error: 'Server error',
      message: error.message,
      stack: error.stack
    });
  }
};

// Obtener una comunicación de usuario por ID
exports.getComunicacionUsuarioById = async (req, res) => {
  try {
    const comunicacion = await db.ComunicacionesUsuarios.findByPk(req.params.id,{
        include: [
            {
              model: db.Usuarios, // Incluir información de SolicitudesBecas
              include: db.Estudiante // Incluir información de Estudiante relacionada con SolicitudesBecas
            }
          ]
    });
    if (!comunicacion) {
      return res.status(404).json({
        error: 'Not found',
        message: `Comunicación de usuario with ID ${req.params.id} not found`
      });
    }
    res.json(comunicacion);
  } catch (error) {
    console.error(`Error fetching comunicación de usuario with ID ${req.params.id}:`, error.message);
    res.status(500).json({
      error: 'Server error',
      message: error.message,
      stack: error.stack
    });
  }
};

// Crear una nueva comunicación de usuario
exports.createComunicacionUsuario = async (req, res) => {
  try {
    const nuevaComunicacion = await db.ComunicacionesUsuarios.create(req.body);
    res.status(201).json(nuevaComunicacion);
  } catch (error) {
    console.error('Error creating comunicación de usuario:', error.message);
    res.status(500).json({
      error: 'Server error',
      message: error.message,
      stack: error.stack
    });
  }
};

// Actualizar una comunicación de usuario por ID
exports.updateComunicacionUsuarioById = async (req, res) => {
  try {
    const comunicacion = await db.ComunicacionesUsuarios.findByPk(req.params.id);
    if (!comunicacion) {
      return res.status(404).json({
        error: 'Not found',
        message: `Comunicación de usuario with ID ${req.params.id} not found`
      });
    }

    await comunicacion.update(req.body);
    res.json(comunicacion);
  } catch (error) {
    console.error(`Error updating comunicación de usuario with ID ${req.params.id}:`, error.message);
    res.status(500).json({
      error: 'Server error',
      message: error.message,
      stack: error.stack
    });
  }
};

// Eliminar una comunicación de usuario por ID
exports.deleteComunicacionUsuarioById = async (req, res) => {
  try {
    const comunicacion = await db.ComunicacionesUsuarios.findByPk(req.params.id);
    if (!comunicacion) {
      return res.status(404).json({
        error: 'Not found',
        message: `Comunicación de usuario with ID ${req.params.id} not found`
      });
    }

    await comunicacion.destroy();
    res.status(204).send(); // No content
  } catch (error) {
    console.error(`Error deleting comunicación de usuario with ID ${req.params.id}:`, error.message);
    res.status(500).json({
      error: 'Server error',
      message: error.message,
      stack: error.stack
    });
  }
};
