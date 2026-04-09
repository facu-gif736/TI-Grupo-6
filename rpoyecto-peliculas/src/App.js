import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import Header from './components/Header/Header.js';
import Footer from './components/Footer/Footer.js';
import Home from './screen/Home/Home.js';

function App () {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" exact="true" component={Home} />
      </Switch>
      <Footer />
    </BrowserRouter>
  )
}

export default App;