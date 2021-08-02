import React from 'react';
import ReactDOM from 'react-dom';
import { WebApp } from './WebApp';
import './styles.css';
import * as moment from 'moment'
import momentFR from 'moment/locale/es-mx'
moment.locale('es-mx', momentFR);
ReactDOM.render(
  <WebApp />,
  document.getElementById('root')
);

