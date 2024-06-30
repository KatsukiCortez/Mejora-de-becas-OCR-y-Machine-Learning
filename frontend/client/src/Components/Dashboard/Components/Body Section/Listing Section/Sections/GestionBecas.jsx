import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../listing.css';

const GestionBecas = () => {
  const [data, setData] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [newStudent, setNewStudent] = useState({
    email: '',
    nombre: '',
    apPaterno: '',
    apMaterno: '',
    direccion: '',
    fechaNacimiento: ''
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
      setShowAddModal(false);
    } catch (error) {
      console.error('Error al agregar estudiante:', error);
    }
  };

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const handleUploadFile = async () => {
    if (!pdfFile) {
      alert('Por favor, seleccione un archivo PDF.');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', pdfFile);
    formData.append('studentId', selectedStudent.idEstudiante); // Agrega el studentId al formData
  
    try {
      const response = await axios.post(
        `http://localhost:8080/octi/upload`, // Asegúrate de que la ruta sea correcta
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      console.log('Respuesta del servidor:', response.data);
      alert('Archivo subido exitosamente.');
      setShowUploadModal(false);
    } catch (error) {
      console.error('Error al subir el archivo:', error);
      alert('Error al subir el archivo. Por favor, inténtelo de nuevo.');
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
            <th>OCR</th>
          </tr>
        </thead>
        <tbody>
          {data.map((alumno) => (
            <tr key={alumno.idEstudiante}>
              <td>{alumno.idEstudiante}</td>
              <td>{alumno.nombre}</td>
              <td>{`${alumno.apPaterno} ${alumno.apMaterno}`}</td>
              <td>
                <button
                  className="btn"
                  onClick={() => {
                    setSelectedStudent(alumno);
                    setShowUploadModal(true);
                  }}
                >
                  Cargar
                </button>
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>

      <button className="btn" onClick={() => setShowAddModal(true)}>
        Agregar estudiante
      </button>

      {showAddModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowAddModal(false)}>&times;</span>
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
                type="email"
                name="email"
                placeholder="Correo Electrónico"
                value={newStudent.email}
                onChange={handleInputChange}
              />
              <br />
              <button type="button" className="btn" onClick={handleAddStudent}>
                Agregar
              </button>
            </form>
          </div>
        </div>
      )}

      {showUploadModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowUploadModal(false)}>&times;</span>
            <h2>Cargar Documento para {selectedStudent.nombre + " " +selectedStudent.apPaterno + " " + selectedStudent.apMaterno}</h2>
            <input type="file" accept="application/pdf" onChange={handleFileChange} />
            <button type='button' className="btn" onClick={handleUploadFile}>Subir</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default GestionBecas;
