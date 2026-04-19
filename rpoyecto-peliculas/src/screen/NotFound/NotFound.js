import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() { 
    return (
        <div>
            <h1>404</h1>
            <h5>Página no encontrada</h5>
            <p className="mt-3">El contenido que estás buscando no existe o la URL es incorrecta.</p>
        </div>
    );
}

export default NotFound;