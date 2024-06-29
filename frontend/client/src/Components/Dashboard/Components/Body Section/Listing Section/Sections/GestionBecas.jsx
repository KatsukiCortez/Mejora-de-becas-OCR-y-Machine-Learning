import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../listing.css';

const GestionBecas = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newStudent, setNewStudent] = useState({
    nombre: '',
    apPaterno: '',
    apMaterno: '',
    direccion: '',
    fechaNacimiento: '',
    idIngresoFamiliar: '',
    idHistorialAcademico: '',
    idDocumento: ''
  });

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:8080/octi/estudiante');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  const handleAddStudent = async () => {
    try {
      const response = await axios.post('http://localhost:8080/octi/estudiante', newStudent);
      setData([...data, response.data]);
      setShowModal(false);
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  return (
    <div>
      <h1>Gestión de Becas</h1>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Cargar</th>
            <th>OCR</th>
            <th>Database</th>
          </tr>
        </thead>
        <tbody>
          {data.map((alumno) => (
            <tr key={alumno.idEstudiante}>
              <td>{alumno.idEstudiante}</td>
              <td>{alumno.nombre}</td>
              <td>{`${alumno.apPaterno} ${alumno.apMaterno}`}</td>
              <td>
                <button className="btn">Cargar</button>
              </td>
              <td>
                <button className="btn">OCR</button>
              </td>
              <td>
                <button className="btn">Database</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="btn" onClick={() => setShowModal(true)}>
        Agregar estudiante
      </button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <h2>Agregar Nuevo Estudiante</h2>
            <form>
              <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={newStudent.nombre}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="apPaterno"
                placeholder="Apellido Paterno"
                value={newStudent.apPaterno}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="apMaterno"
                placeholder="Apellido Materno"
                value={newStudent.apMaterno}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="direccion"
                placeholder="Dirección"
                value={newStudent.direccion}
                onChange={handleInputChange}
              />
              <input
                type="date"
                name="fechaNacimiento"
                placeholder="Fecha de Nacimiento"
                value={newStudent.fechaNacimiento}
                onChange={handleInputChange}
              />
              <input
                type="number"
                name="idIngresoFamiliar"
                placeholder="ID Ingreso Familiar"
                value={newStudent.idIngresoFamiliar}
                onChange={handleInputChange}
              />
              <input
                type="number"
                name="idHistorialAcademico"
                placeholder="ID Historial Académico"
                value={newStudent.idHistorialAcademico}
                onChange={handleInputChange}
              />
              <input
                type="number"
                name="idDocumento"
                placeholder="ID Documento"
                value={newStudent.idDocumento}
                onChange={handleInputChange}
              />
              <button type="button" className="btn" onClick={handleAddStudent}>
                Agregar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default GestionBecas;
