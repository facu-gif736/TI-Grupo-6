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
                    
                    
                    <button className="btn btn-sm btn-info mb-2" onClick={this.toggleDescripcion}>
                        {this.state.verDescripcion ? 'Ocultar descripción' : 'Ver descripción'}
                    </button>

                    
                    {this.state.verDescripcion && (
                        <p className="card-text">{descripcion}</p>
                    )}

                    <br />
                    
                    <Link to={`/detalle/${id}`} className="btn btn-primary btn-sm">Ir a detalle</Link>
                    
                    <button className="btn alert-primary btn-sm ml-2">♥️</button>
                </div>
            </article>
        );
    }
}

export default Card;