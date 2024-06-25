const tf = require('@tensorflow/tfjs');

// Importa node-fetch de forma asíncrona usando import()
import('node-fetch').then(async (nodeFetch) => {
  const fetch = nodeFetch.default; // Obtiene la función fetch de node-fetch

  // Define la función loadModel dentro de la promesa de import
  async function loadModel() {
    const response = await fetch('file:///C:/Users/Adam_/OneDrive/Escritorio/9no%20Semestre/Taller%20de%20Proyectos%201/Trabajos/proyecto/Mejora-de-becas-OCR-y-Machine-Learning/backend/utils/model.json'); // Usa fetch de node-fetch
    const model = await response.json(); // Si el modelo se devuelve en formato JSON
    return model;
  }
  // Llama a loadModel después de definirla
  loadModel().then((loadedModel) => {
    let model = loadedModel; // Asigna el modelo cargado a una variable local

    // Ahora puedes usar la función loadModel y el modelo cargado aquí dentro
    function evaluateBeca(data) {
      if (!model) {
        throw new Error('El modelo no está cargado');
      }

      // Preprocesar los datos según sea necesario
      const inputTensor = tf.tensor2d([data], [1, data.length]);

      // Realizar la predicción
      const prediction = model.predict(inputTensor);

      // Procesar la salida y generar el comentario
      const resultado = prediction.dataSync()[0];
      let comentario;

      if (resultado > 0.5) {
        comentario = "Este estudiante es elegible para la beca.";
      } else {
        comentario = "Este estudiante no es elegible para la beca.";
      }

      return comentario;
    }

    // Exporta las funciones relevantes
    module.exports = {
      loadModel,
      evaluateBeca,
    };
  }).catch((error) => {
    console.error('Error al cargar el modelo:', error);
  });
});
