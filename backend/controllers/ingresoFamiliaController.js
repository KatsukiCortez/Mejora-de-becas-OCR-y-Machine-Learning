const db = require('../models');

// Obtener todos los ingresos familiares
exports.getIngresosFamiliares = async (req, res) => {
  try {
    // Consulta todos los ingresos familiares incluyendo información de Estudiante relacionada
    const ingresos = await db.IngresoFamiliares.findAll({
        include: db.Estudiante  
    });
    res.json(ingresos);
  } catch (error) {
    console.error('Error al obtener los ingresos familiares:', error.message);
    res.status(500).json({
      error: 'Error del servidor',
      message: error.message,
      stack: error.stack
    });
  }
};

// Obtener un ingreso familiar por ID
exports.getIngresoFamiliarById = async (req, res) => {
  try {
    // Busca un ingreso familiar por su ID e incluye información de Estudiante relacionada
    const ingreso = await db.IngresoFamiliares.findByPk(req.params.id,{
        include: db.Estudiante
    });
    if (!ingreso) {
      return res.status(404).json({
        error: 'No encontrado',
        message: `Ingreso familiar con ID ${req.params.id} no encontrado`
      });
    }
    res.json(ingreso);
  } catch (error) {
    console.error(`Error al obtener el ingreso familiar con ID ${req.params.id}:`, error.message);
    res.status(500).json({
      error: 'Error del servidor',
      message: error.message,
      stack: error.stack
    });
  }
};

// Crear un nuevo ingreso familiar
exports.createIngresoFamiliar = async (req, res) => {
  try {
    // Crea un nuevo ingreso familiar utilizando los datos proporcionados en el cuerpo de la solicitud
    const newIngreso = await db.IngresoFamiliares.create(req.body);
    res.status(201).json(newIngreso);
  } catch (error) {
    console.error('Error al crear el ingreso familiar:', error.message);
    res.status(500).json({
      error: 'Error del servidor',
      message: error.message,
      stack: error.stack
    });
  }
};

// Actualizar un ingreso familiar por ID
exports.updateIngresoFamiliarById = async (req, res) => {
  try {
    // Busca un ingreso familiar por su ID para actualizarlo con los datos proporcionados en el cuerpo de la solicitud
    const ingreso = await db.IngresoFamiliares.findByPk(req.params.id);
    if (!ingreso) {
      return res.status(404).json({
        error: 'No encontrado',
        message: `Ingreso familiar con ID ${req.params.id} no encontrado`
      });
    }

    await ingreso.update(req.body);
    res.json(ingreso);
  } catch (error) {
    console.error(`Error al actualizar el ingreso familiar con ID ${req.params.id}:`, error.message);
    res.status(500).json({
      error: 'Error del servidor',
      message: error.message,
      stack: error.stack
    });
  }
};

// Eliminar un ingreso familiar por ID
exports.deleteIngresoFamiliarById = async (req, res) => {
  try {
    // Busca un ingreso familiar por su ID y lo elimina
    const ingreso = await db.IngresoFamiliares.findByPk(req.params.id);
    if (!ingreso) {
      return res.status(404).json({
        error: 'No encontrado',
        message: `Ingreso familiar con ID ${req.params.id} no encontrado`
      });
    }

    await ingreso.destroy();
    res.status(204).send(); // Sin contenido
  } catch (error) {
    console.error(`Error al eliminar el ingreso familiar con ID ${req.params.id}:`, error.message);
    res.status(500).json({
      error: 'Error del servidor',
      message: error.message,
      stack: error.stack
    });
  }
};
