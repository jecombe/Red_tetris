import React from 'react';

const LoginForm = ({ handleNameChange, handleRoomChange, handleSubmit }) => {
  return (
    <div style={loginFormStyle}>
        <input id="name" onChange={handleNameChange} required placeholder="What is youur name .." /><br />
        <input id="room" onChange={handleRoomChange} placeholder="What is your room .." /><br />
        <button type="submit" onClick={handleSubmit}>Submit</button>
    </div>
  );
};

const loginFormStyle = {
    textAlign: 'center',
    margin: '30vh auto',
    width: '70%'
}

export default LoginForm;