import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    const estaLogueado = false; 

    return (
        <header>
            <h1>UdeSA Movies</h1> 
            
            <nav>
                <ul className="nav nav-tabs my-4">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/peliculas">Películas</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/series">Series</Link>
                    </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/favoritos">Favoritas</Link>
                        </li>
                    ) : (
                        <React.Fragment>
                            <li className="nav-item ml-auto">
                                <Link className="nav-link" to="/registro">Registro</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                        </React.Fragment>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default Header;