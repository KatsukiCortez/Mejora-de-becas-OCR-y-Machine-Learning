const db = require('../models');

// Obtener todos los usuarios con información de roles y estudiantes
exports.getUsuarios = async (req, res) => {
    try {
      const usuarios = await db.Usuarios.findAll({
        include: [
          { model: db.Roles }, // Incluir información de roles asociados
          { model: db.Estudiante } // Incluir información de estudiantes asociados
        ]
      });
      res.json(usuarios);
    } catch (error) {
      console.error('Error fetching usuarios:', error.message);
      res.status(500).json({
        error: 'Server error',
        message: error.message,
        stack: error.stack
      });
    }
  };
  
  // Obtener un usuario por ID con información de roles y estudiantes
  exports.getUsuarioById = async (req, res) => {
    try {
      const usuario = await db.Usuarios.findByPk(req.params.id, {
        include: [
          { model: db.Roles }, // Incluir información de roles asociados
          { model: db.Estudiante } // Incluir información de estudiantes asociados
        ]
      });
      if (!usuario) {
        return res.status(404).json({
          error: 'Not found',
          message: `Usuario with ID ${req.params.id} not found`
        });
      }
      res.json(usuario);
    } catch (error) {
      console.error(`Error fetching usuario with ID ${req.params.id}:`, error.message);
      res.status(500).json({
        error: 'Server error',
        message: error.message,
        stack: error.stack
      });
    }
  };
  

// Crear un nuevo usuario
exports.createUsuario = async (req, res) => {
  try {
    const newUsuario = await db.Usuarios.create(req.body);
    res.status(201).json(newUsuario);
  } catch (error) {
    console.error('Error creating usuario:', error.message);
    res.status(500).json({
      error: 'Server error',
      message: error.message,
      stack: error.stack
    });
  }
};

// Actualizar un usuario por ID
exports.updateUsuarioById = async (req, res) => {
  try {
    const usuario = await db.Usuarios.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({
        error: 'Not found',
        message: `Usuario with ID ${req.params.id} not found`
      });
    }

    await usuario.update(req.body);
    res.json(usuario);
  } catch (error) {
    console.error(`Error updating usuario with ID ${req.params.id}:`, error.message);
    res.status(500).json({
      error: 'Server error',
      message: error.message,
      stack: error.stack
    });
  }
};

// Eliminar un usuario por ID
exports.deleteUsuarioById = async (req, res) => {
  try {
    const usuario = await db.Usuarios.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({
        error: 'Not found',
        message: `Usuario with ID ${req.params.id} not found`
      });
    }

    await usuario.destroy();
    res.status(204).send(); // No content
  } catch (error) {
    console.error(`Error deleting usuario with ID ${req.params.id}:`, error.message);
    res.status(500).json({
      error: 'Server error',
      message: error.message,
      stack: error.stack
    });
  }
};
