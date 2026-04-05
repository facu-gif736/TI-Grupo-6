import React, { Component } from 'react';
import Card from '../components/Card/Card';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            peliculasPopulares: [],
            cargandoPopulares: true
        };
    }

    componentDidMount() {
        const apiKey = '80bdeef7a104f2ba9ac2f12c79d50e7b';

        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    peliculasPopulares: data.results.slice(0, 5),
                    cargandoPopulares: false
                });
            })
            .catch(error => {
                console.error('Error al obtener las películas populares:', error);
                this.setState({ cargandoPopulares: false });
            });
    }

    render() {
        return (
            <React.Fragment>
                <h2 className="alert alert-primary mt-4">Películas Populares</h2>
                {this.state.cargandoPopulares ? (
                    <p className="text-center my-5"><strong>Cargando películas...</strong></p>
                ) : (
                    <section className="row cards">
                        {this.state.peliculasPopulares.map(pelicula => (
                            <Card 
                                key={pelicula.id}
                                id={pelicula.id}
                                imagen={pelicula.poster_path} // TMDB manda la mitad de la URL de la imagen en esta propiedad
                                titulo={pelicula.title}
                                descripcion={pelicula.overview}
                            />
                        ))}
                    </section>
                )}

            </React.Fragment>
        
        );
    }
}

export default Home;
                        
