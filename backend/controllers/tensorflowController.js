const { Estudiante, HistorialAcademico, IngresoFamiliares, SeguimientoBecas } = require('../models');

async function evaluarSolicitud(req, res) {
  try {
    // Obtener los estudiantes que cumplen con los criterios
    const estudiantes = await Estudiante.findAll({
      include: [
        {
          model: HistorialAcademico,
          where: {
            promedio: { [Op.gt]: 16 } // Promedio mayor a 16
          }
        },
        {
          model: IngresoFamiliares,
          where: sequelize.literal('ingresosMensuales / numMiembrosFamilia <= 100') // Gasto por miembro de familia menor o igual a 100
        }
      ]
    });

    // Evaluar cada estudiante y guardar el comentario
    const evaluaciones = await Promise.all(estudiantes.map(async (estudiante) => {
      const { ingresosMensuales, numMiembrosFamilia } = estudiante.IngresoFamiliares;
      const { promedio } = estudiante.HistorialAcademico;

      const gastoPorMiembro = ingresosMensuales / numMiembrosFamilia;

      let comentario;
      if (promedio > 16 && gastoPorMiembro <= 100) {
        comentario = 'Apto para recibir la beca';
      } else {
        comentario = 'No apto para recibir la beca';
      }

      // Guardar el comentario en la tabla SeguimientoBecas
      await SeguimientoBecas.create({
        idEstudiante: estudiante.idEstudiante,
        fechaInicio: new Date(),
        estadoActual: 'Evaluado',
        comentarios: comentario,
      });

      return { idEstudiante: estudiante.idEstudiante, comentario };
    }));

    res.status(200).send({ message: 'Evaluación completada', evaluaciones });
  } catch (error) {
    console.error('Error al evaluar la solicitud:', error);
    res.status(500).send({ error: 'Error al evaluar la solicitud' });
  }
}

module.exports = {
  evaluarSolicitud,
};
