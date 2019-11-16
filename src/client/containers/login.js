import React, { useState } from 'react';

import LoginForm from '../components/loginForm/loginForm';

const Login = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState(0);
  const [serverRoom, setServerRoom] = useState(0);

  const handleNameChange = event => setName(event.target.value.trim());
  const handleRoomChange = event => setRoom(event.target.value.trim());
  const handleSubmit = event => {    
    event.persist(); // or event.preventDefault();
    console.log(event);
  }


  return <LoginForm handleNameChange={handleNameChange} handleRoomChange={handleRoomChange}  handleSubmit={handleSubmit} />;
}

export default connect(mapStateToProps)(Login);