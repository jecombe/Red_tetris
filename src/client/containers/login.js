import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import socket from '../api';
import LoginForm from '../components/loginForm';

import { appGetRooms, playerLoginEnterGame } from '../actions';

const Login = props => {


  console.log('LOGIN PROPS', props)

  /* Create a listener for rooms */
  socket.on('appGetRooms', payload => {
    props.appGetRooms(payload);
  });
  
  /* Create ref for child login form component */
  let inputName = React.createRef();
  let inputRoom = React.createRef();

  const handleSubmit = e => {
    e.preventDefault(); // event.persist();
  
    const name = inputName.current.value.trim();
    const room = inputRoom.current.value.trim();
  
    /* Do nothing if name or room are null */
    if (!name || !room) return ;

    props.playerLoginEnterGame({
      playerName: name,
      playerRoom: room
    });

    props.history.push(`/#${room}[${name}]`)
  }

  return (
      <LoginForm
        handleSubmit={handleSubmit}
        inputName={inputName}
        inputRoom={inputRoom}
        rooms={props.rooms}
      />
  );
}

const mapStateToProps = state => ({
  rooms: state.app.rooms
});

const mapDispatchToProps = {
  appGetRooms,
  playerLoginEnterGame
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
