import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';

import store from '../../src/client/store';
import theme from '../../src/client/theme';

import App from '../../src/client/containers/app';
import FooterLayout from '../../src/client/components/Footer/FooterLayout';
import HeaderLayout from '../../src/client/components/Header/HeaderLayout';
import Header from '../../src/client/containers/header';


describe('Footer', () => {
  test('snapshot renders', () => {
    const component = renderer.create(
      <HashRouter hashType="noslash">
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </Provider>
      </HashRouter>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('snapshot renders', () => {
    const component = renderer.create(<FooterLayout />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('snapshot renders', () => {
    const appTest = {
      connected: true,
      rooms: [],
    };
    const handleButtonTest = () => {

    };
    const component = renderer.create(
      <HeaderLayout
        app={appTest}
        handleHomeButton={handleButtonTest}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  // test('snapshot renders', () => {
  //   const component = renderer.create(
  //     <Header />,
  //   );
  //   const tree = component.toJSON();
  //   expect(tree).toMatchSnapshot();
  // });
});
