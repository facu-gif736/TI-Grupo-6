import React, { Component } from 'react';
import Card from '../../components/Card/Card.js';
import { Link } from 'react-router-dom';
import Populares from '../Populares/Populares.js';
import Cartelera from '../Cartelera/Cartelera.js';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state= {
            peliculasPopulares: [],
            peliculasCartelera: [],
            cargandoPopulares: true,
            cargandoCartelera: true,
            valorBuscador: ''
        };
    }

    componentDidMount() {
        const apikey = '80bdeef7a104f2ba9ac2f12c79d50e7b';

        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apikey}`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    peliculasPopulares: data.results.slice(0, 8),
                    cargandoPopulares: false
                });
            })
            .catch(error => console.log('El error fue: ' + error)); 

        fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apikey}`)
            .then(response => response.json())
            .then(data => {
                this.setState ({
                    peliculasCartelera: data.results.slice(0, 8),
                    cargandoCartelera: false
                });
            })
            .catch(error => console.log('El error fue: ' + error));
    }

    evitarSubmit(event) {
        event.preventDefault();
        console.log("El usuario buscó:", this.state.valorBuscador);
    }

    controlarCambios(event) {
        this.setState({
            valorBuscador: event.target.value
        })
    }

    render() {
        return (
            <div className= "container mt-4">
                <div className='mb-5'>
                    <h2>Buscador</h2>
                    <form onSubmit = {event => this.evitarSubmit(event)} className="mb-5">
                        <input
                            type="text"
                            onChange= {event => this.controlarCambios(event)}
                            value={this.state.valorBuscador}
                            placeholder="Buscar pelicula..."
                            className="form-control"
                        />
                    </form>
                </div>
                <div className='mb-5'>
                    <h2>Películas Populares</h2>
                        {this.state.cargandoPopulares ? (
                            <h3>Cargando en Populares...</h3>
                        ) : (
                    <section className="row">
                        {this.state.peliculasPopulares.map((pelicula, idx) => (
                            <Card
                                key={pelicula.id + idx}
                                id={pelicula.id}
                                imagen={pelicula.poster_path}
                                titulo={pelicula.title}
                                descripcion={pelicula.overview}
                            />
                        ))}   
                    </section>
                    )}
                    <Link to="/populares" className="btn btn-outline-primary">
                            Ver todas 
                    </Link>
                </div>

                <div className='mb-5'>
                    <h2>Peliculas en Cartelera</h2>
                    {this.state.cargandoCartelera ? (
                        <h3>Cargando en Cartelera...</h3>
                    ) : (
                    <section className="row">
                        {this.state.peliculasCartelera.map((pelicula, idx) => (
                            <Card
                                key={pelicula.id + idx}
                                id={pelicula.id}
                                imagen={pelicula.poster_path}
                                titulo={pelicula.title}
                                descripcion={pelicula.overview}
                            />
                        ))}
                    </section>
                    )}
                    <Link to="/cartelera" className="btn btn-outline-primary">
                                Ver todas 
                    </Link>
                </div>
            </div>
        );
    }
}

export default Home;

    


                        
