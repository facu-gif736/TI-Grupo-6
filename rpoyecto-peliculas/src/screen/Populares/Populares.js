import React, { Component } from 'react';
import Card from '../../components/Card/Card.js';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header.js';
import Footer from '../../components/Footer/Footer.js';

class Populares extends Component {
    constructor(props) {
        super(props);
        this.state = {
            peliculas: [],
            cargando: true
        };
    }

    componentDidMount() {
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=80bdeef7a104f2ba9ac2f12c79d50e7b`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    peliculas: data.results,
                    cargando: false 
                })
            })
            .catch(error => console.log('El error fue: ' + error));
    }

    render() {
        return (
        <React.Fragment>
            <Header />
            <div className="container mt-5">
                <h2 className="mb-4">Peliculas Populares</h2>
                {this.state.cargando ? (
                    <h3>Cargando...</h3>
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
            <Footer />
        </React.Fragment>
        );
    }
}

export default Populares;

    
