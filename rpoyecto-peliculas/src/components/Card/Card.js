import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            verDescripcion : false,
            esFavorito: false
        };
    }

    componentDidMount() {
        let favoritosGuardados = localStorage.getItem('favoritos');
        if (favoritosGuardados !== null) {
            let arrayFavoritos = JSON.parse(favoritosGuardados);
            let peliculaEncontrada = arrayFavoritos.filter(idGuardado => idGuardado === this.props.id);
            if (peliculaEncontrada.length > 0) {
                this.setState({
                    esFavorito: true
                });
            }
        }
    }

    verMas () {
        this.setState({
            verDescripcion: !this.state.verDescripcion
        });
    }

    agregarFavoritos () {
        let favoritosGuardados = localStorage.getItem('favoritos');
        let arrayFavoritos = [];

        if (favoritosGuardados !== null) {
            arrayFavoritos = JSON.parse(favoritosGuardados);
        }

        arrayFavoritos.push(this.props.id);
        localStorage.setItem('favoritos', JSON.stringify(arrayFavoritos));
        this.setState({
            esFavorito: true
        });
    }

    quitarFavoritos () {
        let favoritosGuardados = localStorage.getItem('favoritos');
        if (favoritosGuardados !== null) {
            let arrayFavoritos = JSON.parse(favoritosGuardados);
            let favoritosRestantes = arrayFavoritos.filter(id => id !== this.props.id);
            localStorage.setItem('favoritos', JSON.stringify(favoritosRestantes));

            this.setState({
                esFavorito: false
            });
        }
    }
        
    
    render() {
        const usuarioLogueado = cookies.get('usuarioLogueado');
        return (
            <article className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                <div className="card h-100 shdow-sm">
                    <img
                        src={`https://image.tmdb.org/t/p/w500/${this.props.imagen}`}
                        className="card-img-top"
                        alt={this.props.titulo}
                    />
                    <div className="card-body d-flex flex-column">
                        <h5 className="card-title">{this.props.titulo}</h5>
                        <button
                            className="btn btn-primary mt-auto"
                            onClick = {() => this.verMas()}
                        >
                            {this.state.verDescripcion ? "Ver menos" : "Ver más"}
                        </button>
                        <Link to={`/pelicula/${this.props.id}`} className="btn btn-secondary mt-2">
                            Detalles
                        </Link>
                        {usuarioLogueado ? (
                            this.state.esFavorito ? (
                                <button 
                                    className="btn btn-danger mt-2"
                                    onClick={() => this.quitarFavoritos()}
                                >
                                    Quitar de favoritos
                                </button>
                            ) : (
                                <button
                                    className="btn btn-warning mt-2"
                                    onClick={() => this.agregarFavoritos()}
                                >
                                    Agregar a favoritos
                                </button>
                            )
                        ) : null}
                            
                        {this.state.verDescripcion ? (
                            <p className="card-text mt-3">{this.props.descripcion}</p>
                        ) : null}
                    </div>
                </div>
            </article>
        )
    }
}

export default Card;