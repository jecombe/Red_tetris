import React from 'react';
import style from './loginForm.css';

const LoginForm = ({ handleNameChange, handleRoomChange, handleSubmit }) => {
  return (
    <div className={style.wrapperForm}>
        <input id="name" onChange={handleNameChange} required placeholder="What is youur name .." /><br />
        <input id="room" onChange={handleRoomChange} placeholder="What is your room .." /><br />
        <button type="submit" onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default LoginForm;