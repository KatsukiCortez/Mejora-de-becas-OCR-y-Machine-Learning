const db = require('../models');

// Obtener todos los registros de historial de acceso
exports.getHistorialAcceso = async (req, res) => {
  try {
    const historial = await db.HistorialAcceso.findAll({
        include: db.Usuarios
    });
    res.json(historial);
  } catch (error) {
    console.error('Error fetching historial de acceso:', error.message);
    res.status(500).json({
      error: 'Server error',
      message: error.message,
      stack: error.stack
    });
  }
};

// Buscar registros de historial de acceso por tipo de acción
exports.buscarHistorialPorTipoAccion = async (req, res) => {
  const { tipoAccion } = req.query;
  try {
    const historial = await db.HistorialAcceso.findAll({
      where: { tipoAccion }
    });
    res.json(historial);
  } catch (error) {
    console.error(`Error fetching historial de acceso for action type ${tipoAccion}:`, error.message);
    res.status(500).json({
      error: 'Server error',
      message: error.message,
      stack: error.stack
    });
  }
};
