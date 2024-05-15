const { Roles } = require('../models/Roles');
const { validationResult } = require('express-validator');

// Crear un nuevo rol
const createRol = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rol } = req.body;

  try {
    const nuevoRol = await Roles.create({ rol });
    res.status(201).json({ message: 'Rol creado correctamente', rol: nuevoRol });
  } catch (error) {
    console.error('Error al crear el rol:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Obtener todos los roles
const getAllRoles = async (req, res) => {
  try {
    const roles = await Roles.findAll();
    res.status(200).json(roles);
  } catch (error) {
    console.error('Error al obtener los roles:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Obtener un rol por su ID
const getRolById = async (req, res) => {
  const { id } = req.params;

  try {
    const rol = await Roles.findByPk(id);
    if (!rol) {
      res.status(404).json({ error: 'Rol no encontrado' });
      return;
    }
    res.status(200).json(rol);
  } catch (error) {
    console.error('Error al obtener el rol por ID:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Eliminar un rol por su ID
const deleteRolById = async (req, res) => {
  const { id } = req.params;

  try {
    const rolEliminado = await Roles.destroy({ where: { idRol: id } });
    if (!rolEliminado) {
      res.status(404).json({ error: 'Rol no encontrado' });
      return;
    }
    res.status(200).json({ message: 'Rol eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el rol por ID:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
    deleteRolById,
    createRol,
    getAllRoles,
    getRolById,
  };
