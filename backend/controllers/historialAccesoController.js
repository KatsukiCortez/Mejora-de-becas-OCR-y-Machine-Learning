const db = require('../models');

// Obtener todos los registros de historial de acceso
exports.getHistorialAcceso = async (req, res) => {
  try {
    // Consulta todos los registros de historial de acceso incluyendo información de Usuarios relacionada
    const historial = await db.HistorialAcceso.findAll({
        include: db.Usuarios
    });
    res.json(historial);
  } catch (error) {
    console.error('Error al obtener el historial de acceso:', error.message);
    res.status(500).json({
      error: 'Error del servidor',
      message: error.message,
      stack: error.stack
    });
  }
};

// Buscar registros de historial de acceso por tipo de acción
exports.buscarHistorialPorTipoAccion = async (req, res) => {
  const { tipoAccion } = req.query;
  try {
    // Busca registros de historial de acceso que coincidan con el tipo de acción especificado
    const historial = await db.HistorialAcceso.findAll({
      where: { tipoAccion }
    });
    res.json(historial);
  } catch (error) {
    console.error(`Error al obtener el historial de acceso para el tipo de acción ${tipoAccion}:`, error.message);
    res.status(500).json({
      error: 'Error del servidor',
      message: error.message,
      stack: error.stack
    });
  }
};
