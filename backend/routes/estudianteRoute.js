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
  const { nombre, apPaterno, apMaterno, direccion, fechaNacimiento, idIngresoFamiliar, idHistorialAcademico, idDocumento } = req.body;

  try {
    const connection = await mysql.createConnection(db);
    const [result] = await connection.execute(
      'INSERT INTO estudiante (nombre, apPaterno, apMaterno, direccion, fechaNacimiento, idIngresoFamiliar, idHistorialAcademico, idDocumento) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [nombre, apPaterno, apMaterno, direccion, fechaNacimiento, idIngresoFamiliar, idHistorialAcademico, idDocumento]
    );
    const newStudent = {
      idEstudiante: result.insertId,
      nombre,
      apPaterno,
      apMaterno,
      direccion,
      fechaNacimiento,
      idIngresoFamiliar,
      idHistorialAcademico,
      idDocumento
    };
    await connection.end();
    res.status(201).json(newStudent);
  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).send({ error: 'Error adding student' });
  }
};

exports.updateEstudianteById = async (req, res) => {
  const { id } = req.params;
  const { nombre, apPaterno, apMaterno, direccion, fechaNacimiento, idIngresoFamiliar, idHistorialAcademico, idDocumento } = req.body;

  try {
    const connection = await mysql.createConnection(db);
    const [result] = await connection.execute(
      'UPDATE estudiante SET nombre = ?, apPaterno = ?, apMaterno = ?, direccion = ?, fechaNacimiento = ?, idIngresoFamiliar = ?, idHistorialAcademico = ?, idDocumento = ? WHERE idEstudiante = ?',
      [nombre, apPaterno, apMaterno, direccion, fechaNacimiento, idIngresoFamiliar, idHistorialAcademico, idDocumento, id]
    );
    await connection.end();

    if (result.affectedRows === 0) {
      res.status(404).send({ error: 'Student not found' });
    } else {
      res.send({ message: 'Student updated successfully' });
    }
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).send({ error: 'Error updating student' });
  }
};

exports.deleteEstudianteById = async (req, res) => {
  const { id } = req.params;

  try {
    const connection = await mysql.createConnection(db);
    const [result] = await connection.execute('DELETE FROM estudiante WHERE idEstudiante = ?', [id]);
    await connection.end();

    if (result.affectedRows === 0) {
      res.status(404).send({ error: 'Student not found' });
    } else {
      res.send({ message: 'Student deleted successfully' });
    }
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).send({ error: 'Error deleting student' });
  }
};
