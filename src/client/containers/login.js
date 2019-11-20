import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import socket from '../api';
import LoginForm from '../components/loginForm';
import LoginRooms from '../components/loginRooms';

import { addRoom, playerLogin } from '../actions';

const Login = props => {

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    socket.on('rooms', payload => {
      setRooms(payload.rooms);
    });

  });

  socket.on('srvMsg', payload => {
    console.log(payload);
  });

  /* Create ref for child login form component */
  let inputName = React.createRef();
  let inputRoom = React.createRef();

  const handleSubmit = e => {
    e.preventDefault(); // event.persist();
  
    const name = inputName.current.value.trim();
    const room = inputRoom.current.value.trim();
  
    if (!name || !room) {
      return ;
    }
    else {
      socket.emit('join', {
        roomName: room,
        playerName: name
      });
    }

    props.playerLogin({
      playerName: name,
      playerRoom: room
    });

    props.history.push(`/#${room}[${name}]`)
  }
  return (
    <div>
      <LoginForm
        handleSubmit={handleSubmit}
        inputName={inputName}
        inputRoom={inputRoom}
      />
      <LoginRooms rooms={rooms} />
    </div>
  );
}

const mapStateToProps = state => ({
  // rooms: state.user.rooms
});

const mapDispatchToProps = {
  addRoom,
  playerLogin
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
