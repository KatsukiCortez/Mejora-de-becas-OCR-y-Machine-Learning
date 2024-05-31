const db = require('../models');

// Obtener todos los documentos
exports.getDocumentos = async (req, res) => {
  try {
    const documentos = await db.Documentos.findAll({
        include: db.Estudiante
    });
    res.json(documentos);
  } catch (error) {
    console.error('Error fetching documentos:', error.message);
    res.status(500).json({
      error: 'Server error',
      message: error.message,
      stack: error.stack
    });
  }
};

// Obtener un documento por ID
exports.getDocumentoById = async (req, res) => {
  try {
    const documento = await db.Documentos.findByPk(req.params.id,{
        include: db.Estudiante
    });
    if (!documento) {
      return res.status(404).json({
        error: 'Not found',
        message: `Documento with ID ${req.params.id} not found`
      });
    }
    res.json(documento);
  } catch (error) {
    console.error(`Error fetching documento with ID ${req.params.id}:`, error.message);
    res.status(500).json({
      error: 'Server error',
      message: error.message,
      stack: error.stack
    });
  }
};

// Crear un nuevo documento
exports.createDocumento = async (req, res) => {
  try {
    const newDocumento = await db.Documentos.create(req.body);
    res.status(201).json(newDocumento);
  } catch (error) {
    console.error('Error creating documento:', error.message);
    res.status(500).json({
      error: 'Server error',
      message: error.message,
      stack: error.stack
    });
  }
};

// Actualizar un documento por ID
exports.updateDocumentoById = async (req, res) => {
  try {
    const documento = await db.Documentos.findByPk(req.params.id);
    if (!documento) {
      return res.status(404).json({
        error: 'Not found',
        message: `Documento with ID ${req.params.id} not found`
      });
    }

    await documento.update(req.body);
    res.json(documento);
  } catch (error) {
    console.error(`Error updating documento with ID ${req.params.id}:`, error.message);
    res.status(500).json({
      error: 'Server error',
      message: error.message,
      stack: error.stack
    });
  }
};

// Eliminar un documento por ID
exports.deleteDocumentoById = async (req, res) => {
  try {
    const documento = await db.Documentos.findByPk(req.params.id);
    if (!documento) {
      return res.status(404).json({
        error: 'Not found',
        message: `Documento with ID ${req.params.id} not found`
      });
    }

    await documento.destroy();
    res.status(204).send(); // No content
  } catch (error) {
    console.error(`Error deleting documento with ID ${req.params.id}:`, error.message);
    res.status(500).json({
      error: 'Server error',
      message: error.message,
      stack: error.stack
    });
  }
};
