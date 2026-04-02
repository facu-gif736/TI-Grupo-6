import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            verDescripcion: false 
        };
    }


    toggleDescripcion = () => {
        this.setState(prevState => ({
            verDescripcion: !prevState.verDescripcion
        }));
    }

    render() {

        const { id, imagen, titulo, descripcion } = this.props;

        return (
            <article className="single-card-movie mb-3">
                <img src={`https://image.tmdb.org/t/p/w342${imagen}`} className="card-img-top" alt={titulo} />
                
                <div className="cardBody">
                    <h5 className="card-title">{titulo}</h5>
                    
                    {/* Botón para mostrar/ocultar descripción */}
                    <button className="btn btn-sm btn-info mb-2" onClick={this.toggleDescripcion}>
                        {this.state.verDescripcion ? 'Ocultar descripción' : 'Ver descripción'}
                    </button>

                    {/* Si verDescripcion es true, mostramos el texto */}
                    {this.state.verDescripcion && (
                        <p className="card-text">{descripcion}</p>
                    )}

                    <br />
                    
                    {/* Link para ir a la pantalla de detalle (Punto 7) */}
                    <Link to={`/detalle/${id}`} className="btn btn-primary btn-sm">Ir a detalle</Link>
                    
                    {/* El botón de favs por ahora lo dejamos de adorno, lo hacemos andar en el Sprint 5 */}
                    <button className="btn alert-primary btn-sm ml-2">♥️</button>
                </div>
            </article>
        );
    }
}

export default Card;