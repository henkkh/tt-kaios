import React from 'react';
import ReactDOM from 'react-dom';
import Teletekst from './components/Teletekst';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/" exact component={Teletekst} />
        <Route path="/#:id" component={Teletekst} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

