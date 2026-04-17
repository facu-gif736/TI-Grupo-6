import React, { Component } from 'react';
import Card from '../../components/Card/Card.js';

class Resultados extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resultados: [],
            cargando: true
        };
    }

    componentDidMount() {
        let busqueda = this.props.match.params.busqueda;
        let tipo = this.props.match.params.tipo;
        const apiKey = '80bdeef7a104f2ba9ac2f12c79d50e7b';

        fetch(`https://api.themoviedb.org/3/search/${tipo}?api_key=${apiKey}&query=${busqueda}`)
        .then(res => res.json())
        .then(data => {
            let arrayResultados = []; 

            if (data.results !== undefined) {
                arrayResultados = data.results;
            }

            this.setState({
                resultados: arrayResultados,
                cargando: false
            });
        })
        .catch(error => console.log('El error fue: ' + error));
    }

    render() {
        return (
            <div className="container mt-5">
                <h2>Resultados de búsqueda: {this.props.match.params.busqueda}</h2>
                <hr />
                
                {this.state.cargando ? (
                    <h3>Buscando...</h3>
                ) : (
                    this.state.resultados.length === 0 ? (
                        <div className="alert alert-warning mt-4">
                            No se encontraron resultados para tu búsqueda.
                        </div>
                    ) : (
                        <section className="row mt-4">
                            {this.state.resultados.map((item, index) => {
                                let tituloMostrar = item.title || item.name
                                return (
                                    <Card 
                                        key={item.id + index}
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

export default Resultados;