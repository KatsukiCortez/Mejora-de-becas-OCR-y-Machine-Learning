import React, { useState } from 'react';
import '../listing.css';

const AnalisisDatos = () => {
  const [showModal, setShowModal] = useState(false);
  const [mlComments, setMlComments] = useState('Espere por favor...'); // MENSAJE ACTUAL PARA ESPERA

  const handleMLComments = () => {
    // SIMULAR LA CONSULTA A MACHINE LEARNING
    setTimeout(() => {
      // SIMULACIÓN DE RESPUESTA
      const mockComments = 'Resultados del análisis de Machine Learning.';
      setMlComments(mockComments);
    }, 2000); // TIEMPO DE CARGA DE 2 SEGUNDOS
    setShowModal(true); // Mostrar el modal mientras se espera la respuesta del backend
  };

  const handleFileView = () => {
    // LOGICA PARA VISUALIZAR EL ARCHIVO DE DATOS
    // NECESARIO PARA ABRIR LA LOGICA DE DATOS
    console.log('Visualizar archivo PDF');
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="sections">
      <h1>Analisis de Datos</h1>
      <table className="table">
        <thead>
          <tr>
            <th>ID Estudiante</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Ingreso Económico</th>
            <th>Historial Académico</th>
            <th>Comentarios ML</th>
            <th>Archivo</th>
          </tr>
        </thead>
        <tbody>
          {/* Aqui se debe mostrar los datos de cada estudiante desde el backend */}
          <tr>
            <td>1</td>
            <td>Yadir</td>
            <td>Cortez</td>
            <td>2000</td>
            <td>14</td>
            <td>
              <button className="btn" onClick={handleMLComments}>
                Comentarios ML
              </button>
            </td>
            <td>
              <button className="btn" onClick={handleFileView}>
                Archivo
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      {/* MOSTRAR COMENTARIOS */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>Comentario de Machine Learning</h2>
            <p>{mlComments}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalisisDatos;
