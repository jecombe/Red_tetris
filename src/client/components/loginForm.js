import React from 'react';

const mapRooms = (rooms) => {
  console.log("rooms =>" , rooms);
  if (rooms) { 
    return rooms.map(i =>{
      return <div key={i.name}>{i.name}</div>;
    })
  }
  else {
    return "";
  }
}

const LoginForm = props => {
  const { handleSubmit, inputName, inputRoom, rooms } = props;
  return (
    <div>
      <div style={style.loginFormStyle}>
          <input id="name" ref={inputName} required placeholder="What is youur name .." /><br />
          <input id="room" ref={inputRoom} required placeholder="What is your room .." /><br />
          <button type="submit" onClick={handleSubmit}>Submit</button>
      </div>
      <div style={style.loginRoomsStyle}> 
          {mapRooms(rooms)}
      </div>
    </div>
  );
};

const style = {
  loginFormStyle: {
    textAlign: 'center',
    margin: '30vh auto',
    width: '70%'
  },
  loginRoomsStyle: {
    border: '1px solid blue',
    textAlign: 'center',
    margin: 'auto',
    width: '70%'
  }
}

export default LoginForm;