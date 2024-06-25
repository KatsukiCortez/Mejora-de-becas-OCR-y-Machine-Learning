const express = require('express');
const router = express.Router();
const estudianteController = require('../controllers/estudianteController');

router.get('/estudiante', estudianteController.getEstudiantes);
router.get('/estudiante/:id', estudianteController.getEstudianteById);
router.post('/estudiante', estudianteController.createEstudiante);
router.put('/estudiante/:id', estudianteController.updateEstudianteById);
router.delete('/estudiante/:id', estudianteController.deleteEstudianteById);

module.exports = router;


/* CREADO POR CHATGTP*/

const mysql = require('mysql2/promise');
const db = {
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD || '',  // usa cadena vacía si no tiene password
  database: process.env.DB_NAME
};

exports.getEstudiantes = async (req, res) => {
  try {
    const connection = await mysql.createConnection(db);
    const [rows] = await connection.execute('SELECT * FROM estudiante');
    await connection.end();
    res.json(rows);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).send({ error: 'Error fetching students' });
  }
};

exports.getEstudianteById = async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await mysql.createConnection(db);
    const [rows] = await connection.execute('SELECT * FROM estudiante WHERE idEstudiante = ?', [id]);
    await connection.end();
    if (rows.length === 0) {
      res.status(404).send({ error: 'Student not found' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).send({ error: 'Error fetching student' });
  }
};

exports.createEstudiante = async (req, res) => {
  const { email, nombre, apPaterno, apMaterno, direccion, fechaNacimiento } = req.body;

  try {
    const connection = await mysql.createConnection(db);
    const [result] = await connection.execute(
      'INSERT INTO estudiante (email, nombre, apPaterno, apMaterno, direccion, fechaNacimiento) VALUES (?, ?, ?, ?, ?, ?)',
      [email, nombre, apPaterno, apMaterno, direccion, fechaNacimiento]
    );
    const newStudent = {
      idEstudiante: result.insertId,
      email,
      nombre,
      apPaterno,
      apMaterno,
      direccion,
      fechaNacimiento
    };
    await connection.end();
    res.status(201).json(newStudent);
  } catch (error) {
    console.error('Error al agregar estudiante:', error);
    res.status(500).send({ error: 'Error al agregar estudiante' });
  }
};

exports.updateEstudianteById = async (req, res) => {
  const { id } = req.params;
  const { nombre, apPaterno, apMaterno, direccion, fechaNacimiento, email } = req.body;

  try {
    const connection = await mysql.createConnection(db);
    const [result] = await connection.execute(
      'UPDATE estudiante SET email = ?, nombre = ?, apPaterno = ?, apMaterno = ?, direccion = ?, fechaNacimiento = ? WHERE idEstudiante = ?',
      [ email, nombre, apPaterno, apMaterno, direccion, fechaNacimiento, id]
    );
    await connection.end();

    if (result.affectedRows === 0) {
      res.status(404).send({ error: 'Estudiante no encontrado' });
    } else {
      res.send({ message: 'Estudiante actualizado correctamente' });
    }
  } catch (error) {
    console.error('Error al actualizar estudiante:', error);
    res.status(500).send({ error: 'Error al actualizar estudiante' });
  }
};

exports.deleteEstudianteById = async (req, res) => {
  const { id } = req.params;

  try {
    const connection = await mysql.createConnection(db);
    const [result] = await connection.execute('DELETE FROM estudiante WHERE idEstudiante = ?', [id]);
    await connection.end();

    if (result.affectedRows === 0) {
      res.status(404).send({ error: 'Estudiante no encontrado' });
    } else {
      res.send({ message: 'Estudiante eliminado correctamente' });
    }
  } catch (error) {
    console.error('Error al eliminar estudiante:', error);
    res.status(500).send({ error: 'Error al eliminar estudiante' });
  }
};
