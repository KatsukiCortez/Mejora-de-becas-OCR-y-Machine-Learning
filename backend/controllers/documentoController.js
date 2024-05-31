const db = require('../models');

// Obtener todos los documentos
exports.getDocumentos = async (req, res) => {
  try {
    // Consulta todos los documentos incluyendo información de Estudiante relacionada
    const documentos = await db.Documentos.findAll({
        include: db.Estudiante
    });
    res.json(documentos);
  } catch (error) {
    console.error('Error al obtener los documentos:', error.message);
    res.status(500).json({
      error: 'Error del servidor',
      message: error.message,
      stack: error.stack
    });
  }
};

// Obtener un documento por ID
exports.getDocumentoById = async (req, res) => {
  try {
    // Busca un documento por su ID e incluye información de Estudiante relacionada
    const documento = await db.Documentos.findByPk(req.params.id,{
        include: db.Estudiante
    });
    if (!documento) {
      return res.status(404).json({
        error: 'No encontrado',
        message: `Documento con ID ${req.params.id} no encontrado`
      });
    }
    res.json(documento);
  } catch (error) {
    console.error(`Error al obtener el documento con ID ${req.params.id}:`, error.message);
    res.status(500).json({
      error: 'Error del servidor',
      message: error.message,
      stack: error.stack
    });
  }
};

// Crear un nuevo documento
exports.createDocumento = async (req, res) => {
  try {
    // Crea un nuevo documento utilizando los datos proporcionados en el cuerpo de la solicitud
    const newDocumento = await db.Documentos.create(req.body);
    res.status(201).json(newDocumento);
  } catch (error) {
    console.error('Error al crear el documento:', error.message);
    res.status(500).json({
      error: 'Error del servidor',
      message: error.message,
      stack: error.stack
    });
  }
};

// Actualizar un documento por ID
exports.updateDocumentoById = async (req, res) => {
  try {
    // Busca un documento por su ID para actualizarlo con los datos proporcionados en el cuerpo de la solicitud
    const documento = await db.Documentos.findByPk(req.params.id);
    if (!documento) {
      return res.status(404).json({
        error: 'No encontrado',
        message: `Documento con ID ${req.params.id} no encontrado`
      });
    }

    await documento.update(req.body);
    res.json(documento);
  } catch (error) {
    console.error(`Error al actualizar el documento con ID ${req.params.id}:`, error.message);
    res.status(500).json({
      error: 'Error del servidor',
      message: error.message,
      stack: error.stack
    });
  }
};

// Eliminar un documento por ID
exports.deleteDocumentoById = async (req, res) => {
  try {
    // Busca un documento por su ID y lo elimina
    const documento = await db.Documentos.findByPk(req.params.id);
    if (!documento) {
      return res.status(404).json({
        error: 'No encontrado',
        message: `Documento con ID ${req.params.id} no encontrado`
      });
    }

    await documento.destroy();
    res.status(204).send(); // Sin contenido
  } catch (error) {
    console.error(`Error al eliminar el documento con ID ${req.params.id}:`, error.message);
    res.status(500).json({
      error: 'Error del servidor',
      message: error.message,
      stack: error.stack
    });
  }
};
