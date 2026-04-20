import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

class Detalle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pelicula: null,
            cargando: true,
            esFavorito: false
        };
    }

    componentDidMount () {
        const id= this.props.match.params.id;
        const apikey = '80bdeef7a104f2ba9ac2f12c79d50e7b';

        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apikey}`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    pelicula: data,
                    cargando: false
                });
            })
            .catch(error => console.log('El error fue: ' + error));
    }

    agregarFavoritos () {
        alert("Pelicula agregada a favoritos!");
    }

    render() {
        const estaLogueado = localStorage.getItem('usuarioLogueado') !== null;
        return (
            <React.Fragment>
                <Header />
            <div className="container mt-5">
                {this.state.cargando ? (
                    <h3>Cargando...</h3>
                ) : (
                <div className="row">
                    <div className="col-12 col-md-4 mb-4">
                        <img
                            src={`https://image.tmdb.org/t/p/w500/${this.state.pelicula.poster_path}`}
                            alt="${this.state.pelicula.title}"
                            className="img-fluid rounded shadow"
                        />
                    </div>
                    <div className="col-12 col-md-8">
                        <h2>{this.state.pelicula.title}</h2>
                        <hr />
                        <p><strong>Calificacion:</strong>{this.state.pelicula.vote_average} /10</p>
                        <p><strong>Fecha de estreno:</strong>{this.state.pelicula.release_date}</p>
                        <p><strong>Duracion:</strong>{this.state.pelicula.runtime} minutos</p>
                        <p><strong>Sinopsis:</strong>{this.state.pelicula.overview}</p>
                        <p><strong>Generos:</strong>
                            <ul>
                                {this.state.pelicula.genres.map((genero, idx) => (
                                    <li key={genero.id + idx}>{genero.name}</li>
                                ))}
                            </ul>
                        </p>
                        {estaLogueado ? (
                            <button 
                                className="btn btn-warning mt-3"
                                onClick ={() => this.agregarFavoritos()}
                            >
                                Agregar a favoritos
                            </button>
                        ) : null}
                    </div>
            </div>
        )}
        </div>
        <Footer />
        </React.Fragment>
        );
    }    
}

export default Detalle;