// Home.js

import React from 'react';
import './Home.css'; // Importa el archivo CSS de estilos para Home
import Carousel from './Carousel';
import Navbar from './Navbar';

const Home = () => {
    return (
        <div className="home-container">
            <Navbar />
            <Carousel />
        </div>
    );
};

export default Home;
