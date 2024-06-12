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
        console.error('Error al obtener los seguimientos de becas:', error.message);
        res.status(500).json({
            error: 'Error del servidor',
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
                error: 'No encontrado',
                message: `Seguimiento de beca con el ID ${req.params.id} no se encontró`
            });
        }
        res.json(seguimiento);
    } catch (error) {
        console.error(`Error al obtener el seguimiento de beca con ID ${req.params.id}:`, error.message);
        res.status(500).json({
            error: 'Error del servidor',
            message: error.message,
            stack: error.stack
        });
    }
};

// Crear un nuevo seguimiento de beca
exports.createSeguimientoBeca = async (req, res) => {
    try {
        const nuevoSeguimiento = await db.SeguimientoBecas.create(req.body);
        res.status(201).json(nuevoSeguimiento);
    } catch (error) {
        console.error('Error al crear el seguimiento de beca:', error.message);
        res.status(500).json({
            error: 'Error del servidor',
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
                error: 'No encontrado',
                message: `Seguimiento de beca con el ID ${req.params.id} no se encontró`
            });
        }

        await seguimiento.update(req.body);
        res.json(seguimiento);
    } catch (error) {
        console.error(`Error al actualizar el seguimiento de beca con ID ${req.params.id}:`, error.message);
        res.status(500).json({
            error: 'Error del servidor',
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
                error: 'No encontrado',
                message: `Seguimiento de beca con el ID ${req.params.id} no se encontró`
            });
        }

        await seguimiento.destroy();
        res.status(204).send(); // Sin contenido
    } catch (error) {
        console.error(`Error al eliminar el seguimiento de beca con ID ${req.params.id}:`, error.message);
        res.status(500).json({
            error: 'Error del servidor',
            message: error.message,
            stack: error.stack
        });
    }
};
