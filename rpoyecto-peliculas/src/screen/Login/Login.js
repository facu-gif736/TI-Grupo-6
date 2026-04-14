import React, { Component } from 'react';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errorMensaje: '' 
        };
    }



    ControlarCambiosEmail(event) {
        this.setState({
            email: event.target.value
        });
    }

    ControlarCambiosPassword(event) {
        this.setState({
            password: event.target.value
        });
    }


    validarLogin(e) {
        e.preventDefault();
        
        let usuariosGuardados = localStorage.getItem('usuarios');
        let arrayUsuarios = [];
               
        if (usuariosGuardados !== null) {
            arrayUsuarios = JSON.parse(usuariosGuardados);

        }   
       
        let usuarioValido = arrayUsuarios.filter( usuario => usuario.email === this.state.email && usuario.password === this.state.password);

        if (usuarioValido.length > 0) {
             cookies.set('usuarioLogueado', this.state.email, {path: '/'});
             window.location.href = '/';
         } else {
             this.setState({ errorMensaje: 'Credenciales incorrectas' });
         }
        }
        
        

    render() {
        return (
            <div className="container mt-5">
                <h2>Iniciar Sesión</h2>
                
                {this.state.errorMensaje ? (
                    <div className="alert alert-danger">{this.state.errorMensaje}</div>
                ) : null}

                <form onSubmit={(event) => this.validarLogin(event)}>    
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
                            onChange={(event) => this.ControlarCambiosPassword(event)} 
                            value={this.state.password} 
                            required
                        />
                    </div>
                    <button type="submit">Ingresar</button>
                </form>
            </div>
        );
    }
}





export default Login;
