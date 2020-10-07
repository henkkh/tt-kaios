import React from 'react';
import ReactDOM from 'react-dom';
import Teletekst from './components/Teletekst';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Softkey } from './components/Softkey/Softkey';

ReactDOM.render(
  <React.StrictMode>
    <Teletekst id='100'/>
    <Softkey left="nieuws" onKeyLeft='s' onKeyCenter='s' onKeyRight='s' center="100" right="sport" ></Softkey>
  </React.StrictMode>,
  document.getElementById('root')
);

