import React from 'react';
import ReactDOM from 'react-dom/client';
import Teletekst from './components/Teletekst';
import { Softkey } from './components/Softkey/Softkey';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <>
    <Teletekst/>
    {/* <Softkey left="nieuws" onKeyLeft='s' onKeyCenter='s' onKeyRight='s' center="100" right="sport" ></Softkey> */}
  </>
);
