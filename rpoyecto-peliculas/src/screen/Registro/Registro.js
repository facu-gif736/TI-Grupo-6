import React, { Component } from 'react';

class Registro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            password:'',
            errorMensaje:''
        };
    }

    ControlarCambiosEmail(event) {
        this.SetState({
            email: event.target.value
        });
    }

    ControlarCambiosPassword(event) {
        this.setState({
            password: event.target.value
        });
    }

    evitarSubmit(event) {
        event.preventDefault();
        if (this.state.password.length < 6) {
            this.setState({errorMensaje: 'La contraseña debe tener al menos 6 caracteres'});
            return;
        }
        
        let usuariosGuardados = localStorage.getItem('usuarios');
        let arrayUsuarios = [];

        if (usuariosGuardados !== null) {
            arrayUsuarios = JSON.parse(usuariosGuardados);
        }
        let emailYaExiste = arrayUsuarios.filter(usuario => usuario.email === this.state.email)

        if (emailYaExiste.length > 0) {
            this.setState({errorMensaje: 'El mail ya esta registrado'});
            return;
        }

        let usuarioNuevo = {
            email: this.state.email,
            password: this.state.password  
        };

        arrayUsuarios.push(usuarioNuevo);
        localStorage.setItem('usuarios', JSON.stringify(arrayUsuarios));
        localStorage.setItem('usuarioLogueado', this.state.email);
        this.setState({errorMensaje: ''});
        this.props.history.push('/');
    }

    render() {
        return (
            <div className="container mt-5">
                <h2>Crear Cuenta</h2>
                {this.state.errorMensaje ? (
                <div className="alert alert-danger">{this.state.errorMensaje}</div>
                ) : null}

                <form onSubmit={(event) => this.evitarSubmit(event)}>
                    <div className="form-group mb-3">
                        <label>Email:</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            onChange={(event) => this.ControlarCambiosEmail(event)}
                            value={this.state.email}
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label>Password:</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            onChange={(event) => this.controlarCambiosPassword(event)} 
                            value={this.state.password} 
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">Registrarse</button>
                </form>
            </div>
        )
    }
}

