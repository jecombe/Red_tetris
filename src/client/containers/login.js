import React, { useState } from 'react';
import { connect } from 'react-redux';

import socket from '../api';
import store from '../store';
import LoginForm from '../components/loginForm/loginForm';
import { justJoined } from '../actions';

const Login = props => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState(0);
  const [serverRoom, setServerRoom] = useState(0);

  const handleNameChange = event => setName(event.target.value.trim());
  const handleRoomChange = event => setRoom(event.target.value.trim());
  const handleSubmit = event => {    
    event.persist(); // or event.preventDefault();
    console.log(event);

    if (!name) {
      return alert("Name can't be empty");
    }
    if (room) {

      /*socket.emit('room', {
        'room': room,
        'name': name
      });*/
      socket.emit('login', {
        username: name 
      });
      socket.emit('joinOrCreateGame', {
        gameName: room, 
        username: name
      });
      socket.on('joined', (data) => {

        console.log('okokokok');
        store.dispatch(justJoined(data));
      });
      props.history.push(`/#${room}[${name}]`)
    }
    
    else {
      console.log("EXITE PAS");
    }
  }

  return (
    <LoginForm 
      handleNameChange={handleNameChange} 
      handleRoomChange={handleRoomChange}  
      handleSubmit={handleSubmit}
    />
  );
}

const mapStateToProps = (state) => {

  const { joined } = state.user;
  const room = state.user.roomList
  const userList = state.user.userList
  console.log('state Connexion ', state)
  const game = state.game

  return {
    joined,
    room,
    userList,
    game
  };
};

export default connect(mapStateToProps)(Login);
