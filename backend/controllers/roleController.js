const db = require('../models');

// Obtener todos los roles
exports.getRoles = async (req, res) => {
  try {
    const roles = await db.Roles.findAll();
    res.json(roles);
  } catch (error) {
    console.error('Error fetching roles:', error.message);
    res.status(500).json({
      error: 'Server error',
      message: error.message,
      stack: error.stack
    });
  }
};

// Obtener un rol por ID
exports.getRoleById = async (req, res) => {
  try {
    const role = await db.Roles.findByPk(req.params.id);
    if (!role) {
      return res.status(404).json({
        error: 'Not found',
        message: `Role with ID ${req.params.id} not found`
      });
    }
    res.json(role);
  } catch (error) {
    console.error(`Error fetching role with ID ${req.params.id}:`, error.message);
    res.status(500).json({
      error: 'Server error',
      message: error.message,
      stack: error.stack
    });
  }
};

// Crear un nuevo rol
// Crear un nuevo rol
exports.createRole = async (req, res) => {
    try {
      const { rol } = req.body; // Obtener solo el campo 'rol' del cuerpo de la solicitud
      const newRole = await db.Roles.create({ rol }); // Crear el nuevo rol con el campo 'rol' proporcionado
  
      res.status(201).json(newRole);
    } catch (error) {
      console.error('Error creating role:', error.message);
      res.status(500).json({
        error: 'Server error',
        message: error.message,
        stack: error.stack
      });
    }
  };
  

// Actualizar un rol por ID
exports.updateRoleById = async (req, res) => {
  try {
    const role = await db.Roles.findByPk(req.params.id);
    if (!role) {
      return res.status(404).json({
        error: 'Not found',
        message: `Role with ID ${req.params.id} not found`
      });
    }

    await role.update(req.body);
    res.json(role);
  } catch (error) {
    console.error(`Error updating role with ID ${req.params.id}:`, error.message);
    res.status(500).json({
      error: 'Server error',
      message: error.message,
      stack: error.stack
    });
  }
};

// Eliminar un rol por ID
exports.deleteRoleById = async (req, res) => {
  try {
    const role = await db.Roles.findByPk(req.params.id);
    if (!role) {
      return res.status(404).json({
        error: 'Not found',
        message: `Role with ID ${req.params.id} not found`
      });
    }

    await role.destroy();
    res.status(204).send(); // No content
  } catch (error) {
    console.error(`Error deleting role with ID ${req.params.id}:`, error.message);
    res.status(500).json({
      error: 'Server error',
      message: error.message,
      stack: error.stack
    });
  }
};
