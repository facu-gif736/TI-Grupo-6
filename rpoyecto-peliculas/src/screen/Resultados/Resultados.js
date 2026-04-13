import React, { Component } from 'react';
import Card from '../../components/Card/Card.js';

class Resultados extends Component {
    constructor(props) {
        super(props);
        this.state = {
            peliculas: [],
            cargando: true,
            terminoBuscado: ''
        };
    }

    componentDidMount() {
        const busqueda = this.props.match.params.termino;
        const apiKey = '80bdeef7a104f2ba9ac2f12c79d50e7b'; // Reemplaza con tu propia clave de API
        this.setState({ terminoBuscado: busqueda})

        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${busqueda}`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    resultados: data.results,
                    cargando:false
                });
            })
            .catch(error => { console.log('EL error fue: ' + error)});
    }

    render() {
        return (
            <div className="container mt-5">
                <h2>Resultados de búsqueda para: "{this.state.terminoBuscado}"</h2>

                {this.state.cargando ? (
                    <h3>Cargando resultados...</h3>
                ) : (
                    this.state.resultados.length === 0 ? (
                        <div className="alert alert-warning">
                            No se encontraron películas para esta búsqueda.
                        </div>
                    ) : (
                        <section className="row">
                            {this.state.resultados.map((pelicula, idx) => (
                                <Card
                                    key={pelicula.id + idx}
                                    id={pelicula.id}
                                    imagen={pelicula.poster_path}
                                    titulo={pelicula.title}
                                    descripcion={pelicula.overview}
                                />
                            ))}
                        </section>
                    )
                )}
            </div>
        );
    }
}