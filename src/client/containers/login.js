import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { connect } from 'react-redux';

import * as actions from '../actions';
import LoginLayout from '../components/Login/LoginLayout';
import { appStatePropTypes } from '../reducers/app';

const Login = (props) => {
  const {
    app,
    reqLogin,
    history,
  } = props;
  const { rooms, games } = app;

  const [errPlayerName, setErrPlayerName] = useState(false);
  const [errPlayerRoom, setErrPlayerRoom] = useState(false);
  const handlePlayerName = React.createRef();
  const handlePlayerRoom = React.createRef();

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

    reqLogin({
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
      games={games}
      handleRoomSubmit={handleRoomSubmit}
    />
  );
};

Login.propTypes = {
  app: appStatePropTypes.isRequired,
  reqLogin: PropTypes.func.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};

const mapStateToProps = (state) => ({
  app: state.app,
});

const mapDispatchToProps = {
  reqLogin: actions.reqLogin,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
