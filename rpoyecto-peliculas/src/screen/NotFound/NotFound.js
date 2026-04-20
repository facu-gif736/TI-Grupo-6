import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header.js';
import Footer from '../../components/Footer/Footer.js';

function NotFound() { 
    return (
        <React.Fragment>
            <Header />
            <div className="container mt-5">
                <h1>404</h1>
            <h5>Página no encontrada</h5>
            <p className="mt-3">El contenido que estás buscando no existe o la URL es incorrecta.</p>
        </div>
        <Footer />
        </React.Fragment>
    );
}

export default NotFound;