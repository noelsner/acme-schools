import React from 'react';
import {render} from 'react-dom';
import {HashRouter} from 'react-router-dom';
import App from './App';

const root = document.querySelector('#root');
render(<HashRouter> <App /> </HashRouter>, root);