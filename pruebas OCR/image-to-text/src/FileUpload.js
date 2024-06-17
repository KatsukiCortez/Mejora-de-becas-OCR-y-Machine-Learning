import React, { useState } from 'react';
import axios from 'axios';

function FileUpload() {
    const [file, setFile] = useState(null);
    const [text, setText] = useState('');
    const [error, setError] = useState(''); // NUEVO ESTADO PARA ERRORES

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setError(''); // LIMPIAR ERROR AL CAMBIAR DE ARCHIVO
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setError('Por favor, selecciona un archivo.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:5000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setText(response.data.text);
            setError(''); // LIMPIAR ERROR SI LA PETICIÓN FUE EXITOSA
        } catch (error) {
            console.error('Error al subir el archivo', error);
            setError('Error al subir el archivo.'); // MOSTRAR MENSAJE DE ERROR
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className='formulario'>
                <input type="file" accept=".pdf" onChange={handleFileChange} className='pdf'/>
                <button type="submit" className='btn'>Subir archivo</button>
            </form>
            {error && <div style={{ color: 'red' }}>{error}</div>} {/* MENSAJE DE ERROR */}
            {text && <div>
                <h3>Texto extraído:</h3>
                <p>{text}</p>
            </div>}
        </div>
    );
}

export default FileUpload;
