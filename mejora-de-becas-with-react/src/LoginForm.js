// LoginForm.js

import React, { useState } from 'react';
import {useHistory} from 'react-router-dom'
import './LoginForm.css'; // Importa el archivo CSS de estilos

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes agregar lógica para enviar los datos del formulario al servidor
        console.log('Email:', email);
        console.log('Password:', password);
        history.push('/Home')
    };

    return (
        <div className="login-container">
            <h2>Iniciar Sesión</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Iniciar Sesión</button>
            </form>
        </div>
    );
};

export default LoginForm;