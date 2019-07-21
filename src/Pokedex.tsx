import * as React from 'react';
import { Provider } from 'react-redux';
import Store from './redux/store';
import Router from './Router';
import '@fortawesome/fontawesome-free/css/all.css';
import './styles/pokedex.scss';

const Pokedex = () => (
  <Provider store={Store}>
    <Router />
  </Provider>
);
export default Pokedex;
