const db = require('../models');

// Obtener todos los usuarios con información de roles y estudiantes
exports.getUsuarios = async (req, res) => {
    try {
        const usuarios = await db.Usuarios.findAll({
            include: [
                { model: db.Roles }, // Incluir información de roles asociados
                { model: db.Estudiante } // Incluir información de estudiantes asociados
            ]
        });
        res.json(usuarios);
    } catch (error) {
        console.error('Error al obtener usuarios:', error.message);
        res.status(500).json({
            error: 'Error del servidor',
            message: error.message,
            stack: error.stack
        });
    }
};

// Obtener un usuario por ID con información de roles y estudiantes
exports.getUsuarioById = async (req, res) => {
    try {
        const usuario = await db.Usuarios.findByPk(req.params.id, {
            include: [
                { model: db.Roles }, // Incluir información de roles asociados
                { model: db.Estudiante } // Incluir información de estudiantes asociados
            ]
        });
        if (!usuario) {
            return res.status(404).json({
                error: 'No encontrado',
                message: `Usuario con ID ${req.params.id} no encontrado`
            });
        }
        res.json(usuario);
    } catch (error) {
        console.error(`Error al obtener usuario con ID ${req.params.id}:`, error.message);
        res.status(500).json({
            error: 'Error del servidor',
            message: error.message,
            stack: error.stack
        });
    }
};

// Crear un nuevo usuario
exports.createUsuario = async (req, res) => {
    try {
        const nuevoUsuario = await db.Usuarios.create(req.body);
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        console.error('Error al crear usuario:', error.message);
        res.status(500).json({
            error: 'Error del servidor',
            message: error.message,
            stack: error.stack
        });
    }
};

// Actualizar un usuario por ID
exports.updateUsuarioById = async (req, res) => {
    try {
        const usuario = await db.Usuarios.findByPk(req.params.id);
        if (!usuario) {
            return res.status(404).json({
                error: 'No encontrado',
                message: `Usuario con ID ${req.params.id} no encontrado`
            });
        }

        await usuario.update(req.body);
        res.json(usuario);
    } catch (error) {
        console.error(`Error al actualizar usuario con ID ${req.params.id}:`, error.message);
        res.status(500).json({
            error: 'Error del servidor',
            message: error.message,
            stack: error.stack
        });
    }
};

// Eliminar un usuario por ID
exports.deleteUsuarioById = async (req, res) => {
    try {
        const usuario = await db.Usuarios.findByPk(req.params.id);
        if (!usuario) {
            return res.status(404).json({
                error: 'No encontrado',
                message: `Usuario con ID ${req.params.id} no encontrado`
            });
        }

        await usuario.destroy();
        res.status(204).send(); // Sin contenido
    } catch (error) {
        console.error(`Error al eliminar usuario con ID ${req.params.id}:`, error.message);
        res.status(500).json({
            error: 'Error del servidor',
            message: error.message,
            stack: error.stack
        });
    }
};
