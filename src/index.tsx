import React from 'react';
import ReactDOM from 'react-dom/client';
import Teletekst from './components/Teletekst';
import { Softkey } from './components/Softkey/Softkey';
import { BrowserRouter as Router, Route } from "react-router-dom";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Teletekst id="100"/>
    <Softkey left="nieuws" onKeyLeft='s' onKeyCenter='s' onKeyRight='s' center="100" right="sport" ></Softkey>
  </React.StrictMode>
);
