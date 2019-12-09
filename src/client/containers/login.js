import React, { useState } from 'react';
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
  const [errPlayerName, setErrPlayerName] = useState(false);
  const [errPlayerRoom, setErrPlayerRoom] = useState(false);
  const handlePlayerName = React.createRef();
  const handlePlayerRoom = React.createRef();

  socket.on('appGetRooms', (payload) => {
    appGetRooms(payload);
  });

  const handleRoomSubmit = (e) => {
    // e.preventDefault(); // event.persist();
    console.log(e);
    if (!handlePlayerRoom.current.value) setErrPlayerRoom(false);
    handlePlayerRoom.current.value = e;
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // event.persist();

    const name = handlePlayerName.current.value.trim();
    const room = handlePlayerRoom.current.value.trim();

    if (!name) setErrPlayerName(true); else setErrPlayerName(false);
    if (!room) setErrPlayerRoom(true); else setErrPlayerRoom(false);

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
      errPlayerName={errPlayerName}
      handlePlayerRoom={handlePlayerRoom}
      errPlayerRoom={errPlayerRoom}
      rooms={rooms}
      handleRoomSubmit={handleRoomSubmit}
    />
  );
};

Login.propTypes = {
  appGetRooms: PropTypes.func.isRequired,
  playerLoginEnterGame: PropTypes.func.isRequired,
  rooms: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
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
