import React, { Component } from 'react';
import Card from '../../components/Card/Card.js';

class Cartelera extends Component {
    constructor(props) {
        super(props);
        this.state = {
            peliculas: [],
            cargando: true
        };
    }

    componentDidMount() {
        fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=80bdeef7a104f2ba9ac2f12c79d50e7b`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    peliculas: data.results,
                    cargando: false
                });
            })
            .catch(error => console.log('El error fue: ' + error));
    
    }

    render () {
        return( 
            <div className="container mt-5">
                <h2 className="mb-4">Películas en Cartelera</h2>
                <hr />
                
                {this.state.cargando ? (
                    <h3>Cargando cartelera...</h3>
                ) : (
                    <section className="row">
                        {this.state.peliculas.map((unaPelicula, index) => (
                            <Card 
                                key={unaPelicula.id + index}
                                id={unaPelicula.id}
                                titulo={unaPelicula.title}
                                imagen={unaPelicula.poster_path}
                                descripcion={unaPelicula.overview}
                            />
                        ))}
                    </section>
                )}
            </div>
        );
    }
}
    
export default Cartelera;

