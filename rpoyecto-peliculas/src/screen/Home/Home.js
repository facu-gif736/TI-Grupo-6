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
            valorBuscador: '',
            tipoBusqueda: 'movie'
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

    controlarCambiosBuscador(event) {
        this.setState({
            valorBuscador: event.target.value
        });
    }

    controlarCambiosTipo(event) {
        this.setState({
            tipoBusqueda: event.target.value
        });
    }

    enviarBusqueda(event) {
        event.preventDefault();

        if (this.state.valorBuscador !== '') {
            this.props.history.push(`/resultados/${this.state.tipoBusqueda}/${this.state.valorBuscador}`);
        }
    }

    render() {
        return (
            <div className= "container mt-4">
                <div className='mb-5'>
                    <h2>Buscador</h2>
                    <form onSubmit={(event) => this.enviarBusqueda(event)}>
                        <div className="d-flex mb-4">
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Buscar..." 
                                onChange={(event) => this.controlarCambiosBuscador(event)}
                                value={this.state.valorBuscador}
                            />
        
                            <select 
                                className="form-control mx-2" 
                                onChange={(event) => this.controlarCambiosTipo(event)}
                                value={this.state.tipoBusqueda}
                            >
                            <option value="movie">Películas</option>
                            <option value="tv">Series</option>
                            </select>
        
                            <button type="submit" className="btn btn-primary">Buscar</button>
                        </div>
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

    


                        
