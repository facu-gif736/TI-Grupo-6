import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie'; 

const cookies = new Cookies();

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usuario: cookies.get('usuarioLogueado')
        };
    }

    cerrarSesion() {
        cookies.remove('usuarioLogueado', {path: '/'});
        this.setState({usuario: undefined});
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <Link className="navbar-brand" to="/">UdeSA Movies</Link>
                    <div className="navbar-nav">
                        <Link className="nav-link" to="/">Home</Link>
                        
                        {this.state.usuario ? (
                            <React.Fragment>
                                <Link className="nav-link" to="/favoritos">Favoritas</Link>
                                <button 
                                    className="nav-link btn btn-link" 
                                    onClick={() => this.cerrarSesion()}
                                >
                                    Cerrar Sesión
                                </button>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <Link className="nav-link" to="/login">Login</Link>
                                <Link className="nav-link" to="/registro">Registro</Link>
                            </React.Fragment>
                        )}
                    </div>
                </div>
            </nav>
        );
    }
}

export default Header;