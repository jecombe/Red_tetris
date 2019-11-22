import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import socket from '../api';
import LoginForm from '../components/loginForm';

import { roomsGet, playerLogin, playerLoginEnterGame } from '../actions';

const Login = props => {

  const [rooms, setRooms] = useState([]);

   /*useEffect(() => {

  


   });*/

  socket.on('rooms', payload => {
    // setRooms(payload.rooms);
    props.roomsGet(payload.rooms);
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
    /*else {
      socket.emit('login', {
        username: name 
      });
      
      /*socket.emit('joinOrCreateGame', {
        gameName: room, 
        username: name
      });
    }*/

    /*props.playerLogin({
      playerName: name,
      playerRoom: room
    });*/
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
        rooms={rooms}
      />
  );
}

const mapStateToProps = state => ({
  // rooms: state.user.rooms
});

const mapDispatchToProps = {
  roomsGet,
  //playerLogin,
  playerLoginEnterGame
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
