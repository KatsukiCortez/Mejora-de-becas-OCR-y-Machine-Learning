// Navbar.js

import React from 'react';
import './Navbar.css'; // Importa el archivo CSS de estilos para Navbar

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul>
                <li><a href="#">Opción 1</a></li>
                <li><a href="#">Opción 2</a></li>
                <li><a href="#">Opción 3</a></li>
                <li><a href="#">Opción 4</a></li>
            </ul>
        </nav>
    );
};

export default Navbar;
