import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../listing.css';

const AnalisisDatos = () => {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [mlComments, setMlComments] = useState('Espere por favor...'); // MENSAJE ACTUAL PARA ESPERA

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsResponse, ingresosResponse, historialResponse] = await Promise.all([
          axios.get('http://localhost:8080/octi/estudiante'),
          axios.get('http://localhost:8080/octi/ingresos-familiares'),
          axios.get('http://localhost:8080/octi/historial-academico')
        ]);
        setStudents(studentsResponse.data);
        // Puedes manejar ingresos y historial aquí si necesitas almacenarlos
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleMLComments = () => {
    // Simulación de consulta a Machine Learning
    setTimeout(() => {
      const mockComments = 'Resultados del análisis de Machine Learning.';
      setMlComments(mockComments);
      setShowModal(true); // Mostrar el modal después de obtener los comentarios
    }, 2000); // Tiempo de carga de 2 segundos
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleFileView = () => {
    console.log('Visualizar archivo PDF');
    // Lógica para visualizar el archivo PDF
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
          </tr>
        </thead>
        <tbody>
          {students.map((alumno) => (
            <tr key={alumno.idEstudiante}>
              <td>{alumno.idEstudiante}</td>
              <td>{alumno.nombre}</td>
              <td>{`${alumno.apPaterno} ${alumno.apMaterno}`}</td>
              {/* Aqudeberías mostrar los datos correctos de ingreso e historial */}
              <td>{/* Ingreso del alumno */}</td>
              <td>{/* Historial del alumno */}</td>
              <td>
                <button className="btn" onClick={() => {
                  setSelectedStudent(alumno);
                  handleMLComments(); // Llamar a la función de comentarios ML
                }}>
                  Ver comentario
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal para mostrar los comentarios de Machine Learning */}
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
