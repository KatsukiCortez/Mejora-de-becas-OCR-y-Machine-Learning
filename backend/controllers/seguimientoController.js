const db = require('../models');

// Obtener todos los seguimientos de becas
exports.getSeguimientosBecas = async (req, res) => {
    try {
        const seguimientos = await db.SeguimientoBecas.findAll({
            include: [
                {
                  model: db.SolicitudesBecas, // Incluir información de SolicitudesBecas
                  include: db.Estudiante // Incluir información de Estudiante relacionada con SolicitudesBecas
                }
              ]
            });
        res.json(seguimientos);
    } catch (error) {
        console.error('Error fetching seguimientos de becas:', error.message);
        res.status(500).json({
            error: 'Server error',
            message: error.message,
            stack: error.stack
        });
    }
};

// Obtener un seguimiento de beca por ID
exports.getSeguimientoBecaById = async (req, res) => {
    try {
        const seguimiento = await db.SeguimientoBecas.findByPk(req.params.id,{
            include: [
                {
                  model: db.SolicitudesBecas, // Incluir información de SolicitudesBecas
                  include: db.Estudiante // Incluir información de Estudiante relacionada con SolicitudesBecas
                }
              ]
        });
        if (!seguimiento) {
            return res.status(404).json({
                error: 'Not found',
                message: `Seguimiento de beca with ID ${req.params.id} not found`
            });
        }
        res.json(seguimiento);
    } catch (error) {
        console.error(`Error fetching seguimiento de beca with ID ${req.params.id}:`, error.message);
        res.status(500).json({
            error: 'Server error',
            message: error.message,
            stack: error.stack
        });
    }
};

// Crear un nuevo seguimiento de beca
exports.createSeguimientoBeca = async (req, res) => {
    try {
        const newSeguimiento = await db.SeguimientoBecas.create(req.body);
        res.status(201).json(newSeguimiento);
    } catch (error) {
        console.error('Error creating seguimiento de beca:', error.message);
        res.status(500).json({
            error: 'Server error',
            message: error.message,
            stack: error.stack
        });
    }
};

// Actualizar un seguimiento de beca por ID
exports.updateSeguimientoBecaById = async (req, res) => {
    try {
        const seguimiento = await db.SeguimientoBecas.findByPk(req.params.id);
        if (!seguimiento) {
            return res.status(404).json({
                error: 'Not found',
                message: `Seguimiento de beca with ID ${req.params.id} not found`
            });
        }

        await seguimiento.update(req.body);
        res.json(seguimiento);
    } catch (error) {
        console.error(`Error updating seguimiento de beca with ID ${req.params.id}:`, error.message);
        res.status(500).json({
            error: 'Server error',
            message: error.message,
            stack: error.stack
        });
    }
};

// Eliminar un seguimiento de beca por ID
exports.deleteSeguimientoBecaById = async (req, res) => {
    try {
        const seguimiento = await db.SeguimientoBecas.findByPk(req.params.id);
        if (!seguimiento) {
            return res.status(404).json({
                error: 'Not found',
                message: `Seguimiento de beca with ID ${req.params.id} not found`
            });
        }

        await seguimiento.destroy();
        res.status(204).send(); // No content
    } catch (error) {
        console.error(`Error deleting seguimiento de beca with ID ${req.params.id}:`, error.message);
        res.status(500).json({
            error: 'Server error',
            message: error.message,
            stack: error.stack
        });
    }
};
