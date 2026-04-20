import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from './screen/Home/Home.js';
import Detalle from './screen/Detalle/Detalle.js';
import Registro from './screen/Registro/Registro.js';
import Login from './screen/Login/Login.js';
import Favoritos from './screen/Favoritos/Favoritos.js';
import Cartelera from './screen/Cartelera/Cartelera.js';
import Populares from './screen/Populares/Populares.js';
import Resultados from './screen/Resultados/Resultados.js';
import NotFound from './screen/NotFound/NotFound.js';

function App () {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact="true" component={Home} />
        <Route path="/pelicula/:id" component={Detalle} />
        <Route path="/registro" component={Registro} />
        <Route path="/login" component={Login} />
        <Route path="/favoritos" component={Favoritos} />
        <Route path="/cartelera" component={Cartelera} />
        <Route path="/populares" component={Populares} />
        <Route path="/resultados/:tipo/:busqueda" component={Resultados} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}

export default App;