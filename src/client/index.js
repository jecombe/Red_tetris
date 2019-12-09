import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';

import './index.css';
import store from './store';
import theme from './theme';
import App from './containers/app';

console.log('Made By jecombe && dzonda at 42 Lyon campus');

ReactDom.render((
  <HashRouter hashType="noslash">
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </HashRouter>
), document.getElementById('app'));
