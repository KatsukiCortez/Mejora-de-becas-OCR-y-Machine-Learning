const db = require('../models');

// Obtener todos los ingresos familiares
exports.getIngresosFamiliares = async (req, res) => {
  try {
    const ingresos = await db.IngresoFamiliares.findAll({
        include: db.Estudiante  
    });
    res.json(ingresos);
  } catch (error) {
    console.error('Error fetching ingresos familiares:', error.message);
    res.status(500).json({
      error: 'Server error',
      message: error.message,
      stack: error.stack
    });
  }
};

// Obtener un ingreso familiar por ID
exports.getIngresoFamiliarById = async (req, res) => {
  try {
    const ingreso = await db.IngresoFamiliares.findByPk(req.params.id,{
        include: db.Estudiante
    });
    if (!ingreso) {
      return res.status(404).json({
        error: 'Not found',
        message: `Ingreso familiar with ID ${req.params.id} not found`
      });
    }
    res.json(ingreso);
  } catch (error) {
    console.error(`Error fetching ingreso familiar with ID ${req.params.id}:`, error.message);
    res.status(500).json({
      error: 'Server error',
      message: error.message,
      stack: error.stack
    });
  }
};

// Crear un nuevo ingreso familiar
exports.createIngresoFamiliar = async (req, res) => {
  try {
    const newIngreso = await db.IngresoFamiliares.create(req.body);
    res.status(201).json(newIngreso);
  } catch (error) {
    console.error('Error creating ingreso familiar:', error.message);
    res.status(500).json({
      error: 'Server error',
      message: error.message,
      stack: error.stack
    });
  }
};

// Actualizar un ingreso familiar por ID
exports.updateIngresoFamiliarById = async (req, res) => {
  try {
    const ingreso = await db.IngresoFamiliares.findByPk(req.params.id);
    if (!ingreso) {
      return res.status(404).json({
        error: 'Not found',
        message: `Ingreso familiar with ID ${req.params.id} not found`
      });
    }

    await ingreso.update(req.body);
    res.json(ingreso);
  } catch (error) {
    console.error(`Error updating ingreso familiar with ID ${req.params.id}:`, error.message);
    res.status(500).json({
      error: 'Server error',
      message: error.message,
      stack: error.stack
    });
  }
};

// Eliminar un ingreso familiar por ID
exports.deleteIngresoFamiliarById = async (req, res) => {
  try {
    const ingreso = await db.IngresoFamiliares.findByPk(req.params.id);
    if (!ingreso) {
      return res.status(404).json({
        error: 'Not found',
        message: `Ingreso familiar with ID ${req.params.id} not found`
      });
    }

    await ingreso.destroy();
    res.status(204).send(); // No content
  } catch (error) {
    console.error(`Error deleting ingreso familiar with ID ${req.params.id}:`, error.message);
    res.status(500).json({
      error: 'Server error',
      message: error.message,
      stack: error.stack
    });
  }
};
