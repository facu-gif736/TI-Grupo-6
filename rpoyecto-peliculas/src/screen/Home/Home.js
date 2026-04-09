import React, { Component } from 'react';
import Card from '../../components/Card/Card.js';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state= {
            peliculasPopulares: [],
            cargando: true,
        };
    }

    componentDidMount() {
        const apikey = '80bdeef7a104f2ba9ac2f12c79d50e7b';

        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apikey}`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    peliculasPopulares: data.results.slice(0, 8),
                    cargando: false
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
                <h2>Películas populares</h2>
                <h3>Cargando...</h3>

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
            </div>
        );
    }
}

export default Home;

    


                        
