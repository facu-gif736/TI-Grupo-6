import React from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie'; 

const cookies = new Cookies();

function Header() {
    const usuarioLogueado = cookies.get('usuarioLogueado');

    const cerrarSesion = () => {
        cookies.remove('usuarioLogueado'); 
        window.location.href = '/'; 
    }

    return (
        <header>
            <h1>UdeSA Movies</h1> 
            <nav>
                <ul className="nav nav-tabs my-4">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/populares">Populares</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/cartelera">Cartelera</Link>
                    </li>
                    
                    {usuarioLogueado ? (
                        <React.Fragment>
                            <li className="nav-item">
                                <Link className="nav-link" to="/favoritos">Favoritas</Link>
                            </li>
                            <li className="nav-item ml-auto">
                                <button 
                                    className="nav-link btn btn-link" 
                                    style={{textDecoration: 'none'}} 
                                    onClick={() => cerrarSesion()}
                                >
                                    Cerrar Sesión
                                </button>
                            </li>
                        </React.Fragment>
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