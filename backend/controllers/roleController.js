const db = require('../models');

// Obtener todos los roles
exports.getRoles = async (req, res) => {
  try {
    // Consulta todos los roles disponibles
    const roles = await db.Roles.findAll();
    res.json(roles);
  } catch (error) {
    console.error('Error al obtener los roles:', error.message);
    res.status(500).json({
      error: 'Error del servidor',
      message: error.message,
      stack: error.stack
    });
  }
};

// Obtener un rol por ID
exports.getRoleById = async (req, res) => {
  try {
    // Busca un rol por su ID
    const role = await db.Roles.findByPk(req.params.id);
    if (!role) {
      return res.status(404).json({
        error: 'No encontrado',
        message: `Rol con ID ${req.params.id} no encontrado`
      });
    }
    res.json(role);
  } catch (error) {
    console.error(`Error al obtener el rol con ID ${req.params.id}:`, error.message);
    res.status(500).json({
      error: 'Error del servidor',
      message: error.message,
      stack: error.stack
    });
  }
};

// Crear un nuevo rol
exports.createRole = async (req, res) => {
  try {
    // Crea un nuevo rol utilizando solo el campo 'rol' del cuerpo de la solicitud
    const { rol } = req.body;
    const newRole = await db.Roles.create({ rol });

    res.status(201).json(newRole);
  } catch (error) {
    console.error('Error al crear el rol:', error.message);
    res.status(500).json({
      error: 'Error del servidor',
      message: error.message,
      stack: error.stack
    });
  }
};

// Actualizar un rol por ID
exports.updateRoleById = async (req, res) => {
  try {
    // Busca un rol por su ID para actualizarlo con los datos proporcionados en el cuerpo de la solicitud
    const role = await db.Roles.findByPk(req.params.id);
    if (!role) {
      return res.status(404).json({
        error: 'No encontrado',
        message: `Rol con ID ${req.params.id} no encontrado`
      });
    }

    await role.update(req.body);
    res.json(role);
  } catch (error) {
    console.error(`Error al actualizar el rol con ID ${req.params.id}:`, error.message);
    res.status(500).json({
      error: 'Error del servidor',
      message: error.message,
      stack: error.stack
    });
  }
};

// Eliminar un rol por ID
exports.deleteRoleById = async (req, res) => {
  try {
    // Busca un rol por su ID y lo elimina
    const role = await db.Roles.findByPk(req.params.id);
    if (!role) {
      return res.status(404).json({
        error: 'No encontrado',
        message: `Rol con ID ${req.params.id} no encontrado`
      });
    }

    await role.destroy();
    res.status(204).send(); // Sin contenido
  } catch (error) {
    console.error(`Error al eliminar el rol con ID ${req.params.id}:`, error.message);
    res.status(500).json({
      error: 'Error del servidor',
      message: error.message,
      stack: error.stack
    });
  }
};
