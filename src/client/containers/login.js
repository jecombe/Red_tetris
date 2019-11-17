import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import socket from '../api';
import store from '../store';
import LoginForm from '../components/loginForm';
import LoginRooms from '../components/loginRooms';
import { justJoined } from '../actions';

const Login = props => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState(0);
  const [serverRoom, setServerRoom] = useState(
 //   roomList: [ props.roomList ]
  0);
  
  useEffect(() => {
    socket.on('getRoomList', payload => {
      console.log('Use effect getRoomList');
      console.log({payload});
      setServerRoom(payload.roomList.roomName)
    });
    
    socket.on('joined', (data) => {
      console.log({data});
      store.dispatch(justJoined(data));
      
    });
  }, [0]);
  
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
      
      // socket.on('joined', (data) => {
        //   console.log('okokokok');
        //   store.dispatch(justJoined(data));
        // });
        
      props.history.push(`/#${room}[${name}]`)
    }
    
    else {
      console.log("EXITE PAS");
    }
  }
  
  
  return (
    <div>
      {console.log(serverRoom)}    
      <LoginForm 
        handleNameChange={handleNameChange} 
        handleRoomChange={handleRoomChange}  
        handleSubmit={handleSubmit}
      />
      <LoginRooms roomList={props.roomList} dataRoom={serverRoom} />
    </div>
  );
}

const mapStateToProps = (state) => {
  const { joined, roomList } = state.user;

	return {
		joined,
    roomList
	};
};

export default connect(mapStateToProps)(Login);
