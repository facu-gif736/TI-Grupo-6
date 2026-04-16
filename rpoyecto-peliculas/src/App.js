import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import Header from './components/Header/Header.js';
import Footer from './components/Footer/Footer.js';
import Home from './screen/Home/Home.js';
import Detalle from './screen/Detalle/Detalle.js';
import Registro from './screen/Registro/Registro.js';
import Login from './screen/Login/Login.js';
import Favoritos from './screen/Favoritos/Favoritos.js';
import Cartelera from './screen/Cartelera/Cartelera.js';
import Populares from './screen/Populares/Populares.js';

function App () {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" exact="true" component={Home} />
        <Route path="/pelicula/:id" component={Detalle} />
        <Route path="/registro" component={Registro} />
        <Route path="/login" component={Login} />
        <Route path="/favoritos" component={Favoritos} />
        <Route path="/cartelera" component={Cartelera} />
        <Route path="/populares" component={Populares} />
      </Switch>
      <Footer />
    </BrowserRouter>
  )
}

export default App;