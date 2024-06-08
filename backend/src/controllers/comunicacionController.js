const { ComunicacionesUsuarios } = require('../models/comunicacionModel'); // Importa el modelo de ComunicacionesUsuarios

// Controlador para obtener todas las comunicaciones de un usuario
const getComunicacionesUsuario = async (req, res) => {
  try {
    const idUsuario = req.params.idUsuario; // Obtén el ID del usuario de los parámetros de la solicitud
    const comunicaciones = await ComunicacionesUsuarios.findAll({
      where: { idUsuario } // Busca todas las comunicaciones del usuario especificado
    });
    res.status(200).json({ comunicaciones });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las comunicaciones del usuario.' });
  }
};

// Controlador para crear una nueva comunicación de usuario
const createComunicacionUsuario = async (req, res) => {
    try {
      const { idUsuario, mensaje } = req.body; // Obtén el ID del usuario y el mensaje de la solicitud
  
      // Validación de datos
      if (!idUsuario || typeof idUsuario !== 'number') {
        return res.status(400).json({ error: 'El ID del usuario es requerido y debe ser un número.' });
      }
      if (!mensaje || typeof mensaje !== 'string' || mensaje.trim() === '') {
        return res.status(400).json({ error: 'El mensaje es requerido y debe ser una cadena no vacía.' });
      }
  
      // Verifica que el usuario exista
      const usuarioExistente = await Usuarios.findByPk(idUsuario);
      if (!usuarioExistente) {
        return res.status(404).json({ error: 'Usuario no encontrado.' });
      }
  
      const nuevaComunicacion = await ComunicacionesUsuarios.create({
        idUsuario,
        mensaje
      });
      res.status(201).json({ nuevaComunicacion });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear la comunicación de usuario.' });
    }
  };
  


// Controlador para eliminar una comunicación de usuario por su ID
 const deleteComunicacionUsuario = async (req, res) => {
  try {
    const idComunicacion = req.params.idComunicacion; // Obtén el ID de la comunicación de los parámetros de la solicitud
    const comunicacion = await ComunicacionesUsuarios.findByPk(idComunicacion); // Busca la comunicación por su ID
    if (!comunicacion) {
      return res.status(404).json({ error: 'Comunicación no encontrada.' });
    }
    await comunicacion.destroy(); // Elimina la comunicación
    res.status(200).json({ message: 'Comunicación eliminada correctamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar la comunicación de usuario.' });
  }
};

module.exports = {
    deleteComunicacionUsuario,  
    getComunicacionesUsuario,
    createComunicacionUsuario
  };
