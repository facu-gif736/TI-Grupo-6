import React, { Component } from 'react';
import Card from '../../components/Card/Card.js';

class Favoritos extends Component {
    constructor(props) {
        super(props)
        this.state = {
            peliculasFavoritas: [],
            cargando: true
        };
    }

    componentDidMount() {
        let favoritos = localStorage.getItem('favoritos');

        if (favoritos !== null) {
            let arrayIds = JSON.parse(favoritos);
            const apikey = '80bdeef7a104f2ba9ac2f12c79d50e7b';
            if (arrayIds.length === 0) {
                this.setState({cargando: false});
                return;
            }

            for(let i = 0; i < arrayIds.length; i++) {
                let id = arrayIds[i];
                fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apikey}`)
                    .then(response => response.json())
                    .then(data => {
                        this.setState({
                            peliculasFavoritas: this.state.peliculasFavoritas.concat(data),
                            cargando: false
                        });
                    })
                    .catch(error => console.log('El error fue: ' + error));
                        }
                    } else {
                        this.setState({cargando: false});
                    }
        }

        render() {
        return (
            <div className="container mt-5">
                <h2>Mis Favoritos</h2>
                <hr />
                {this.state.cargando ? (
                    <h3>Cargando...</h3>
                ) : (
                    this.state.peliculasFavoritas.length === 0 ? (
                        <div className="alert alert-info mt-4">No hay favoritos guardados.</div>
                    ) : (
                        <section className="row mt-4">
                            {this.state.peliculasFavoritas.map((item, idx) => {
                                let tituloMostrar = item.title 

                                return (
                                    <Card 
                                        key={item.id + idx}
                                        id={item.id}
                                        titulo={tituloMostrar}
                                        imagen={item.poster_path}
                                        descripcion={item.overview}
                                    />
                                );
                            })}
                        </section>
                    )
                )}
            </div>
        );
    }
}

export default Favoritos;

