import React from 'react';

const LoginForm = props => {
  const { handleSubmit, inputName, inputRoom } = props;
  return (
    <div style={loginFormStyle}>
        <input id="name" ref={inputName} required placeholder="What is youur name .." /><br />
        <input id="room" ref={inputRoom} required placeholder="What is your room .." /><br />
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