import React from 'react';
import ReactDom from 'react-dom';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';
import { ConnectedRouter } from 'connected-react-router';
import CssBaseline from '@material-ui/core/CssBaseline';

import store, { history } from '../../../src/client/store';
import theme from '../../../src/client/theme';

import App from '../../../src/client/containers/App';
import GameChat from '../../../src/client/components/Game/GameChat';

// import FooterLayout from '../../src/client/components/Footer/FooterLayout';
// import HeaderLayout from '../../src/client/components/Header/HeaderLayout';
// import Header from '../../src/client/containers/header';
configure({ adapter: new Adapter() });

describe('Footer', () => {
  // test('snapshot renders', () => {
  //   const component = renderer.create(
  //     <Provider store={store}>
  //       <ThemeProvider theme={theme}>
  //         <ConnectedRouter history={history}>
  //           <CssBaseline />
  //           <App />
  //         </ConnectedRouter>
  //       </ThemeProvider>
  //     </Provider>,
  //   );
  //   const tree = component.toJSON();
  //   expect(tree).toMatchSnapshot();
  // });
  test('snapshot renders', () => {
    const div = document.createElement('tetris');

    // console.log(store);
    // store.getState().router.location.pathname = '/fdsfs[sds]';

    ReactDom.render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <ConnectedRouter history={history}>
            <CssBaseline />
            <App />
          </ConnectedRouter>
        </ThemeProvider>
      </Provider>,
      div,
    );
  });

  // test('should call', () => {
  //   const div = document.createElement('tetris');

  //   const chat = [
  //     {
  //       date: '14h : 21',
  //       id: 'ee9063e2-9811-4f3b-bd0d-2c30f6f3ec9b',
  //       text: 'gh joined the room',
  //       user: 'server',
  //     },
  //   ];
  //   const message = '';
  //   const handleMessage = jest.fn();
  //   const handleSubmit = jest.fn();

  //   // for scroll into view issuee
  //   window.HTMLElement.prototype.scrollIntoView = function () {};

  //   const wrapper = mount(
  //     <GameChat chat={chat} message={message} handleMessage={handleMessage} handleSubmit={handleSubmit} />,
  //   );

  //   let p = wrapper.find('#chatBoxInput').at(2);
  //   p.simulate('change', {
  //     target: { value: 'hello' }
  //   });
  //   expect(handleMessage).toBeCalled();


  //   p = wrapper.find('.chatBoxButton');
  //   p.simulate('click');
  //   expect(handleSubmit).toBeCalled();
  // });
  // test('snapshot renders', () => {
  //   const component = renderer.create(<FooterLayout />);
  //   const tree = component.toJSON();
  //   expect(tree).toMatchSnapshot();
  // });
  // test('snapshot renders', () => {
  //   const appTest = {
  //     connected: true,
  //     rooms: [],
  //   };
  //   const handleButtonTest = () => {};
  //   const component = renderer.create(
  //     <HeaderLayout app={appTest} handleHomeButton={handleButtonTest} />,
  //   );
  //   const tree = component.toJSON();
  //   expect(tree).toMatchSnapshot();
  // });
  // test('snapshot renders', () => {
  //   const component = renderer.create(
  //     <Header />,
  //   );
  //   const tree = component.toJSON();
  //   expect(tree).toMatchSnapshot();
  // });
});
