import React, { useState } from 'react';
import '../listing.css';

const Comunicacion = () => {
  const [correo, setCorreo] = useState('');
  const [contenido, setContenido] = useState('');

  

  const handleSubmit = (e) => {
    e.preventDefault();
    // IMPLEMENTAR LOGICA DEL ENVIO DE LOS CORREOS
    console.log(`Correo: ${correo}, Contenido: ${contenido}`);
    // PODEMOS AÑADIR LOGICA DE BACKEND
    // LIMPIAR DATOS
    setCorreo('');
    setContenido('');
  };

  return (
    <div>
      <h2>Comunicación</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="correo">Para:</label>

          <input
            type="email"
            id="correo"
            name="correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contenido">Contenido:</label>
          <textarea
            id="contenido"
            name="contenido"
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
            rows={5}
            required
          />
        </div>
        <button type="submit" className="btn">
          Enviar
        </button>
      </form>
    </div>
  );
}

export default Comunicacion;
