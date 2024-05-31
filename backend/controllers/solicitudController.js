const db = require('../models');

// Obtener todas las solicitudes de becas con información de Estudiante
exports.getSolicitudesBecas = async (req, res) => {
    try {
        const solicitudes = await db.SolicitudesBecas.findAll({
            include: db.Estudiante // Incluir la información de Estudiante relacionada
        });
        res.json(solicitudes);
    } catch (error) {
        console.error('Error al obtener las solicitudes de becas:', error.message);
        res.status(500).json({
            error: 'Error del servidor',
            message: error.message,
            stack: error.stack
        });
    }
};


// Obtener una solicitud de beca por ID con información de Estudiante
exports.getSolicitudBecaById = async (req, res) => {
    try {
        const solicitud = await db.SolicitudesBecas.findByPk(req.params.id, {
            include: db.Estudiante // Incluir la información de Estudiante relacionada
        });
        if (!solicitud) {
            return res.status(404).json({
                error: 'No encontrado',
                message: `Solicitud de beca con ID ${req.params.id} no encontrada`
            });
        }
        res.json(solicitud);
    } catch (error) {
        console.error(`Error al obtener la solicitud de beca con ID ${req.params.id}:`, error.message);
        res.status(500).json({
            error: 'Error del servidor',
            message: error.message,
            stack: error.stack
        });
    }
};


// Crear una nueva solicitud de beca
exports.createSolicitudBeca = async (req, res) => {
    try {
        const nuevaSolicitud = await db.SolicitudesBecas.create(req.body);
        res.status(201).json(nuevaSolicitud);
    } catch (error) {
        console.error('Error al crear la solicitud de beca:', error.message);
        res.status(500).json({
            error: 'Error del servidor',
            message: error.message,
            stack: error.stack
        });
    }
};

// Actualizar una solicitud de beca por ID
exports.updateSolicitudBecaById = async (req, res) => {
    try {
        const solicitud = await db.SolicitudesBecas.findByPk(req.params.id);
        if (!solicitud) {
            return res.status(404).json({
                error: 'No encontrado',
                message: `Solicitud de beca con ID ${req.params.id} no encontrada`
            });
        }

        await solicitud.update(req.body);
        res.json(solicitud);
    } catch (error) {
        console.error(`Error al actualizar la solicitud de beca con ID ${req.params.id}:`, error.message);
        res.status(500).json({
            error: 'Error del servidor',
            message: error.message,
            stack: error.stack
        });
    }
};

// Eliminar una solicitud de beca por ID
exports.deleteSolicitudBecaById = async (req, res) => {
    try {
        const solicitud = await db.SolicitudesBecas.findByPk(req.params.id);
        if (!solicitud) {
            return res.status(404).json({
                error: 'No encontrado',
                message: `Solicitud de beca con ID ${req.params.id} no encontrada`
            });
        }

        await solicitud.destroy();
        res.status(204).send(); // Sin contenido
    } catch (error) {
        console.error(`Error al eliminar la solicitud de beca con ID ${req.params.id}:`, error.message);
        res.status(500).json({
            error: 'Error del servidor',
            message: error.message,
            stack: error.stack
        });
    }
};
