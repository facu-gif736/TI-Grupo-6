import React from 'react';
import { Route, Switch} from 'react-router-dom';
import '../src/styles.css';
import Header from './components/Header/Header.js';
import Footer from './components/Footer/Footer.js';
import Home from './screen/Home.js';
import Peliculas from './screen/Peliculas.js';
import Series from './screen/Series.js';
import Registro from './screen/Registro.js';
import Login from './screen/Login.js';
import NotFound from './screen/NotFound.js';

function App() {
  return (
    <div className="container">
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/peliculas" component={Peliculas} />
        <Route path="/series" component={Series} />
        <Route path="/registro" component={Registro} />
        <Route path="/login" component={Login} />
        <Route path="*"component={NotFound} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
