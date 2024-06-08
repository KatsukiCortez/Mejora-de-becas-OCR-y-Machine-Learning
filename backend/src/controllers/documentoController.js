const { validationResult } = require('express-validator');
const { Documentos } = require('../models/documentoModel'); // Importar el modelo de Documento

// Obtener todos los documentos
const getAllDocumentos = async (req, res) => {
  try {
    const documentos = await Documentos.findAll();
    res.status(200).json(documentos);
  } catch (error) {
    console.error('Error al obtener todos los documentos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Crear un nuevo documento
const createDocumento = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { estado_documento, resultado_analisis_ml, comentarios, fecha } = req.body;

  try {
    const nuevoDocumento = await Documento.create({
      estado_documento,
      resultado_analisis_ml,
      comentarios,
      fecha
    });

    res.status(201).json({ message: 'Documento creado correctamente', documento: nuevoDocumento });
  } catch (error) {
    console.error('Error al crear documento:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Obtener un documento por su ID
const getDocumentoById = async (req, res) => {
  const { id } = req.params;

  try {
    const documento = await Documento.findByPk(id);
    if (!documento) {
      res.status(404).json({ error: 'Documento no encontrado' });
      return;
    }

    res.status(200).json(documento);
  } catch (error) {
    console.error('Error al obtener documento por ID:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Actualizar un documento por su ID
const updateDocumento = async (req, res) => {
  const { id } = req.params;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { estado_documento, resultado_analisis_ml, comentarios, fecha } = req.body;

  try {
    const documento = await Documento.findByPk(id);
    if (!documento) {
      res.status(404).json({ error: 'Documento no encontrado' });
      return;
    }

    await documento.update({
      estado_documento,
      resultado_analisis_ml,
      comentarios,
      fecha
    });

    res.status(200).json({ message: 'Documento actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar documento:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Eliminar un documento por su ID
const deleteDocumento = async (req, res) => {
  const { id } = req.params;

  try {
    const documento = await Documento.findByPk(id);
    if (!documento) {
      res.status(404).json({ error: 'Documento no encontrado' });
      return;
    }

    await documento.destroy();
    res.status(200).json({ message: 'Documento eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar documento:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  getAllDocumentos,
  createDocumento,
  getDocumentoById,
  updateDocumento,
  deleteDocumento
};
