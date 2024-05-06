// Home.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    Mi Aplicación
                </Link>
                <ul className="navbar-menu">
                    <li className="navbar-item">
                        <Link to="/gestion-de-becas" className="navbar-link">Gestión de Becas</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/revision-de-historial-academico" className="navbar-link">Revisión de Historial Académico</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/contacto" className="navbar-link">Contacto</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/analisis-de-datos" className="navbar-link">Análisis de Datos</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Home;

