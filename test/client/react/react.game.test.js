import React from 'react';
import ReactDom from 'react-dom';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';
import { ConnectedRouter } from 'connected-react-router';
import CssBaseline from '@material-ui/core/CssBaseline';

import store, { history } from '../../../src/client/store';
import theme from '../../../src/client/theme';
import reducer, { gameState } from '../../../src/client/reducers/game';

import App from '../../../src/client/containers/App';
import GameChat from '../../../src/client/components/Game/GameChat';
import GameRoom from '../../../src/client/components/Game/GameRoom';
import GameBoardContainer from '../../../src/client/containers/Game/GameBoardContainer';

configure({ adapter: new Adapter() });

describe('React Game Tests', () => {
  test('Room', () => {
    const name = 'name';
    const game = gameState;
    game.settings.owner = name;
    game.players = {
      player: {
        name: 'name',
        score: 0,
        level: 0,
        lines: 0,
        mallus: 0,
        rank: 0,
        stage: null,
        piece: null,
        position: { x: 3, y: 0 },
        nbPiece: 0,
        loose: false,
        win: false,
      },
    };
    const handleStart = jest.fn();
    const handleSetOwner = jest.fn();

    const wrapper = mount(
      <GameRoom name={name} game={game} handleStart={handleStart} handleSetOwner={handleSetOwner} />,
    );

    let p = wrapper.find('.startButton');
    p.simulate('click');
    expect(handleStart).toBeCalled();

    p = wrapper.find('.playair-name').at(1);
    p.simulate('click');
    expect(handleSetOwner).toBeCalled();
  });

  // test('Board', () => {
  //   const name = 'name';
  //   const game = gameState;
  //   // console.log(store);
  //   // store.getState().game.settings.owner = name;
  //   // store.getState().game.settings.started = true;

  //   // let events = [];
  //   // document.addEventListener = jest.fn((event, cb) => {
  //   //     events[event] = cb;
  //   // });
  //   let events = {};
  //   document.addEventListener = jest.fn((event, cb) => {
  //     events[event] = cb;
  //   });

  //   const reqMove = jest.fn();
  //   const wrapper = shallow(
  //     <Provider store={store}>
  //       <GameBoardContainer reqMove={reqMove}/>
  //     </Provider>
  //   );


  //   // var event = new KeyboardEvent('keydown', {'keyCode': 40});
  //   // document.dispatchEvent(event);
  //   // wrapper.find('.gameBoardContainer').simulate('keydown', {key: 40});
  //   // events.({key: 40});

  //   expect(reqMove).toBeCalled();
  // });

  test('Chat', () => {
    const chat = [
      {
        date: '14h : 21',
        id: 'ee9063e2-9811-4f3b-bd0d-2c30f6f3ec9b',
        text: 'gh joined the room',
        user: 'server',
      },
    ];
    const message = '';
    const handleMessage = jest.fn();
    const handleSubmit = jest.fn();

    // for scroll into view issuee
    window.HTMLElement.prototype.scrollIntoView = function () {};

    const wrapper = mount(
      <GameChat chat={chat} message={message} handleMessage={handleMessage} handleSubmit={handleSubmit} />,
    );

    let p = wrapper.find('#chatBoxInput').at(2);
    p.simulate('change', {
      target: { value: 'hello' },
    });
    expect(handleMessage).toBeCalled();

    p = wrapper.find('.chatBoxButton');
    p.simulate('click');
    expect(handleSubmit).toBeCalled();
  });
});
