const db = require('../models');

// Obtener todas las comunicaciones de usuarios
exports.getComunicacionesUsuarios = async (req, res) => {
  try {
    // Consulta todas las comunicaciones de usuarios incluyendo información adicional de Estudiante
    const comunicaciones = await db.ComunicacionesUsuarios.findAll({
      include: db.Estudiante
    });
    res.json(comunicaciones);
  } catch (error) {
    console.error('Error al obtener las comunicaciones de usuarios:', error.message);
    res.status(500).json({
      error: 'Error del servidor',
      message: error.message,
      stack: error.stack
    });
  }
};

// Obtener una comunicación de usuario por ID
exports.getComunicacionUsuarioById = async (req, res) => {
  try {
    // Busca una comunicación de usuario por su ID e incluye información adicional de Usuarios y Estudiante relacionado con SolicitudesBecas
    const comunicacion = await db.ComunicacionesUsuarios.findByPk(req.params.id,{
      include: db.Estudiante
    });
    if (!comunicacion) {
      return res.status(404).json({
        error: 'No encontrado',
        message: `Comunicación de usuario con ID ${req.params.id} no encontrado`
      });
    }
    res.json(comunicacion);
  } catch (error) {
    console.error(`Error al obtener la comunicación de usuario con ID ${req.params.id}:`, error.message);
    res.status(500).json({
      error: 'Error del servidor',
      message: error.message,
      stack: error.stack
    });
  }
};

// Crear una nueva comunicación de usuario
exports.createComunicacionUsuario = async (req, res) => {
  try {
    // Crea una nueva comunicación de usuario utilizando los datos proporcionados en el cuerpo de la solicitud
    const nuevaComunicacion = await db.ComunicacionesUsuarios.create(req.body);
    res.status(201).json(nuevaComunicacion);
  } catch (error) {
    console.error('Error al crear la comunicación de usuario:', error.message);
    res.status(500).json({
      error: 'Error del servidor',
      message: error.message,
      stack: error.stack
    });
  }
};

// Actualizar una comunicación de usuario por ID
exports.updateComunicacionUsuarioById = async (req, res) => {
  try {
    // Busca una comunicación de usuario por su ID para actualizarla con los datos proporcionados en el cuerpo de la solicitud
    const comunicacion = await db.ComunicacionesUsuarios.findByPk(req.params.id);
    if (!comunicacion) {
      return res.status(404).json({
        error: 'No encontrado',
        message: `Comunicación de usuario con ID ${req.params.id} no encontrado`
      });
    }

    await comunicacion.update(req.body);
    res.json(comunicacion);
  } catch (error) {
    console.error(`Error al actualizar la comunicación de usuario con ID ${req.params.id}:`, error.message);
    res.status(500).json({
      error: 'Error del servidor',
      message: error.message,
      stack: error.stack
    });
  }
};

// Eliminar una comunicación de usuario por ID
exports.deleteComunicacionUsuarioById = async (req, res) => {
  try {
    // Busca una comunicación de usuario por su ID y la elimina
    const comunicacion = await db.ComunicacionesUsuarios.findByPk(req.params.id);
    if (!comunicacion) {
      return res.status(404).json({
        error: 'No encontrado',
        message: `Comunicación de usuario con ID ${req.params.id} no encontrado`
      });
    }

    await comunicacion.destroy();
    res.status(204).send(); // Sin contenido
  } catch (error) {
    console.error(`Error al eliminar la comunicación de usuario con ID ${req.params.id}:`, error.message);
    res.status(500).json({
      error: 'Error del servidor',
      message: error.message,
      stack: error.stack
    });
  }
};
