import React from 'react';

import Header from './header';
import Main from './main';
import Footer from './footer';

/* App container structure the app globally with flexbox */

const App = () => (
  <div style={style.AppWrapper}>
    <div style={style.HeaderWrapper}>
      <Header />
    </div>
    <div style={style.MainWrapper}>
      <Main />
    </div>
    <div style={style.FooterWrapper}>
      <Footer />
    </div>
  </div>
);

const style = {
  AppWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  HeaderWrapper: {
    display: 'flex',
    alignItems: 'center',
    minHeight: '10vh',
    border: '1px solid black',
  },
  MainWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '80vh',
    border: '1px solid black',
  },
  FooterWrapper: {
    height: '5vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default App;
