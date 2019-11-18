import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import './index.css';
import store from './store';
import App from './containers/app';

console.log("Made By jecombe && dzonda at 42 Lyon campus");

ReactDom.render((
  <HashRouter hashType={'noslash'}>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>
), document.getElementById('app'));
