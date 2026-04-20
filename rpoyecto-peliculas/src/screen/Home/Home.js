import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Card from '../../components/Card/Card';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            peliculasCartelera: [],
            peliculasPopulares: [],
            valorBuscador: '',
            tipoBusqueda: 'movie',
            cargandoCartelera: true,
            cargandoPopulares: true
        };
    }

    componentDidMount() {
        const apiKey = '80bdeef7a104f2ba9ac2f12c79d50e7b';

        fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`)
            .then(res => res.json())
            .then(data => {
                let resultadosCartelera = [];
                if (data.results !== undefined) {
                    resultadosCartelera = data.results.slice(0, 4);
                }
                this.setState({
                    peliculasCartelera: resultadosCartelera,
                    cargandoCartelera: false
                });
            })
            .catch(err => console.log(err));

        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
            .then(res => res.json())
            .then(data => {
                let resultadosPopulares = [];
                if (data.results !== undefined) {
                    resultadosPopulares = data.results.slice(0, 4);
                }
                this.setState({
                    peliculasPopulares: resultadosPopulares,
                    cargandoPopulares: false
                });
            })
            .catch(err => console.log(err));
    }

    controlarCambiosBuscador(event) {
        this.setState({ valorBuscador: event.target.value });
    }

    controlarCambiosTipo(event) {
        this.setState({ tipoBusqueda: event.target.value });
    }

    enviarBusqueda(event) {
        event.preventDefault(); 
        if (this.state.valorBuscador !== '') {
            this.props.history.push(`/resultados/${this.state.tipoBusqueda}/${this.state.valorBuscador}`);
        }
    }

    render() {
        return (
            <React.Fragment>
                <Header />
                
                <div className="container mt-5">
                    
                    {/* Buscador */}
                    <form onSubmit={(event) => this.enviarBusqueda(event)}>
                        <div className="d-flex mb-5">
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Buscar películas o series..." 
                                onChange={(event) => this.controlarCambiosBuscador(event)}
                                value={this.state.valorBuscador}
                            />
                            
                            <select 
                                className="form-control mx-2" 
                                style={{ width: '150px' }}
                                onChange={(event) => this.controlarCambiosTipo(event)}
                                value={this.state.tipoBusqueda}
                            >
                                <option value="movie">Películas</option>
                                <option value="tv">Series</option>
                            </select>
                            
                            <button type="submit" className="btn btn-primary">Buscar</button>
                        </div>
                    </form>

                    {/* Cartelera */}
                    <div className="mb-5">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h2>Películas en Cartelera</h2>
                            <Link to="/cartelera" className="btn btn-outline-primary">Ver todas</Link>
                        </div>
                        <hr />

                        {this.state.cargandoCartelera ? (
                            <h3>Cargando cartelera...</h3>
                        ) : (
                            <section className="row">
                                {this.state.peliculasCartelera.map((pelicula, idx) => (
                                    <Card 
                                        key={pelicula.id + idx}
                                        id={pelicula.id}
                                        titulo={pelicula.title}
                                        imagen={pelicula.poster_path}
                                        descripcion={pelicula.overview}
                                    />
                                ))}
                            </section>
                        )}
                    </div>

                    {/* Populares */}
                    <div className="mb-5">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h2>Películas Populares</h2>
                            <Link to="/peliculas" className="btn btn-outline-primary">Ver todas</Link>
                        </div>
                        <hr />

                        {this.state.cargandoPopulares ? (
                            <h3>Cargando populares...</h3>
                        ) : (
                            <section className="row">
                                {this.state.peliculasPopulares.map((pelicula, idx) => (
                                    <Card 
                                        key={pelicula.id + idx}
                                        id={pelicula.id}
                                        titulo={pelicula.title}
                                        imagen={pelicula.poster_path}
                                        descripcion={pelicula.overview}
                                    />
                                ))}
                            </section>
                        )}
                    </div>

                </div>
                <Footer />
            </React.Fragment>
        );
    }
}

export default Home;

    


                        
