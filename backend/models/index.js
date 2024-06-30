const db = require('../models');

// Obtener datos estadísticos
exports.getEstadisticasEstudiantes = async (req, res) => {
  try {
    // Consulta para obtener la cantidad total de estudiantes
    const queryTotalEstudiantes = 'SELECT COUNT(*) AS total FROM estudiantes';
    const [totalEstudiantes] = await db.sequelize.query(queryTotalEstudiantes, {
      type: db.sequelize.QueryTypes.SELECT
    });

    // Consulta para obtener el promedio académico general
    const queryPromedioAcademico = 'SELECT AVG(promedio) AS promedio FROM historialacademico';
    const [promedioAcademico] = await db.sequelize.query(queryPromedioAcademico, {
      type: db.sequelize.QueryTypes.SELECT
    });

    // Consulta para obtener el promedio de ingresos familiares
    const queryPromedioIngresos = 'SELECT AVG(ingresosMensuales) AS promedio FROM ingresofamiliares';
    const [promedioIngresos] = await db.sequelize.query(queryPromedioIngresos, {
      type: db.sequelize.QueryTypes.SELECT
    });

    // Consulta para obtener la cantidad de solicitudes de becas por estado
    const querySolicitudesPorEstado = 'SELECT estado, COUNT(*) AS cantidad FROM solicitudesbecas GROUP BY estado';
    const solicitudesPorEstado = await db.sequelize.query(querySolicitudesPorEstado, {
      type: db.sequelize.QueryTypes.SELECT
    });

    // Consulta para obtener la distribución de tipos de becas solicitadas
    const queryTiposBecas = 'SELECT tipoBeca, COUNT(*) AS cantidad FROM solicitudesbecas GROUP BY tipoBeca';
    const tiposBecas = await db.sequelize.query(queryTiposBecas, {
      type: db.sequelize.QueryTypes.SELECT
    });

    // Consulta para obtener la cantidad de documentos aprobados, rechazados y en revisión
    const queryDocumentosEstados = 'SELECT resultadoAnalisisML, COUNT(*) AS cantidad FROM documentos GROUP BY resultadoAnalisisML';
    const documentosEstados = await db.sequelize.query(queryDocumentosEstados, {
      type: db.sequelize.QueryTypes.SELECT
    });

    res.json({
      totalEstudiantes: totalEstudiantes.total,
      promedioAcademico: promedioAcademico.promedio,
      promedioIngresos: promedioIngresos.promedio,
      solicitudesPorEstado,
      tiposBecas,
      documentosEstados
    });
  } catch (error) {
    console.error('Error al obtener las estadísticas:', error.message);
    res.status(500).json({
      error: 'Error del servidor',
      message: error.message,
      stack: error.stack
    });
  }
};
