const { db } = require('../config/database');
const { validationResult } = require('express-validator');
const { bcrypt } = require('bcrypt');

// Función de utilidad para manejar errores
const handleError = (res, error) => {
  console.error('Error:', error);
  res.status(500).json({ error: 'Error interno del servidor' });
};

// Validaciones de datos utilizando express-validator (ejemplo)
const validateUserData = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Obtener todos los usuarios
const getAllUsers = async (req, res) => {
  try {
    const sql = 'SELECT * FROM Usuarios';
    const users = await db.query(sql);
    res.status(200).json(users);
  } catch (error) {
    handleError(res, error);
  }
};

// Obtener un usuario por su ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = 'SELECT * FROM Usuarios WHERE idUsuario = ?';
    const user = await db.query(sql, [id]);
    if (user.length === 0) {
      res.status(404).json({ error: 'Usuario no encontrado' });
      return;
    }
    res.status(200).json(user[0]);
  } catch (error) {
    handleError(res, error);
  }
};

// Agregar un nuevo usuario
const addUser = async (req, res) => {
  try {
    const { nombre_usuario, contraseña, rol } = req.body;
    const hashedPassword = await bcrypt.hash(contraseña, 10); // Hash de la contraseña
    const sql = 'INSERT INTO Usuarios (nombre, password, rol) VALUES (?, ?, ?)';
    await db.query(sql, [nombre_usuario, hashedPassword, rol]);
    res.status(201).json({ message: 'Usuario agregado correctamente' });
  } catch (error) {
    handleError(res, error);
  }
};

// Actualizar información de un usuario
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_usuario, contraseña, rol } = req.body;
    const hashedPassword = await bcrypt.hash(contraseña, 10); // Hash de la contraseña
    const sql = 'UPDATE Usuarios SET nombre = ?, password = ?, rol = ? WHERE idUsuario = ?';
    const result = await db.query(sql, [nombre_usuario, hashedPassword, rol, id]);
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Usuario no encontrado' });
      return;
    }
    res.status(200).json({ message: 'Usuario actualizado correctamente' });
  } catch (error) {
    handleError(res, error);
  }
};

// Eliminar un usuario por su ID
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = 'DELETE FROM Usuarios WHERE idUsuario = ?';
    const result = await db.query(sql, [id]);
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Usuario no encontrado' });
      return;
    }
    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = {
  getAllUsers,
  addUser,
  getUserById,
  updateUser,
  deleteUser,
  validateUserData, // Incluido para validar datos en rutas que lo necesiten
};
