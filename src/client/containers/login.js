import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { connect } from 'react-redux';

import socket from '../api';
import * as actions from '../actions';
import LoginLayout from '../components/Login/LoginLayout';

const Login = (props) => {
  const {
    appGetRooms,
    playerLoginEnterGame,
    history,
    rooms,
  } = props;

  socket.on('appGetRooms', (payload) => {
    appGetRooms(payload);
  });

  const handlePlayerName = React.createRef();
  const handlePlayerRoom = React.createRef();

  const handleSubmit = (e) => {
    e.preventDefault(); // event.persist();

    const name = handlePlayerName.current.value.trim();
    const room = handlePlayerRoom.current.value.trim();

    if (!name || !room) return;

    playerLoginEnterGame({
      playerName: name,
      playerRoom: room,
    });

    history.push(`/#${room}[${name}]`);
  };

  return (
    <LoginLayout
      handleSubmit={handleSubmit}
      handlePlayerName={handlePlayerName}
      handlePlayerRoom={handlePlayerRoom}
      rooms={rooms}
    />
  );
};

Login.propTypes = {
  appGetRooms: PropTypes.func.isRequired,
  playerLoginEnterGame: PropTypes.func.isRequired,
  rooms: PropTypes.arrayOf(PropTypes.string).isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};

const mapStateToProps = (state) => ({
  rooms: state.app.rooms,
});

const mapDispatchToProps = {
  appGetRooms: actions.appGetRooms,
  playerLoginEnterGame: actions.playerLoginEnterGame,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
