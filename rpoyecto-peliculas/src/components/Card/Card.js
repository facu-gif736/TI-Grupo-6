import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            verDescripcion : false
        };
    }

    verMas () {
        this.setState({
            verDescripcion: !this.state.verDescripcion
        });
    }

    render() {
        return (
            <article className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                <div className="card h-100 shdow-sm">
                    <img
                        src={`https://image.tmdb.org/t/p/w500/${this.props.imagen}`}
                        className="card-img-top"
                        alt={this.props.titulo}
                    />
                    <div className="card-body d-flex flex-column">
                        <h5 className="card-title">{this.props.titulo}</h5>
                        <button
                            className="btn btn-primary mt-auto"
                            onClick = {() => this.verMas()}
                        >
                            {this.state.verDescripcion ? "Ver menos" : "Ver más"}
                        </button>
                        <Link to={`/pelicula/${this.props.id}`} className="btn btn-secondary mt-2">
                            Detalles
                        </Link>
                        {this.state.verDescripcion ? (
                            <p className="card-text mt-3">{this.props.descripcion}</p>
                        ) : null}
                    </div>
                </div>
            </article>
        )
    }
}

export default Card;