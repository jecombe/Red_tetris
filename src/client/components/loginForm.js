import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const mapRooms = (rooms) => {
  // console.log("rooms =>" , rooms);
  if (rooms.length !== 0) {
    return rooms.map((i) => (
      <div key={i.roomName}>
        {i.roomName}
        <button type="submit">Join this room</button>
      </div>
    ));
  }

  // console.log('here');
  return (
    <div>
        No rooms available
    </div>
  );
};

const LoginForm = (props) => {
  const {
    handleSubmit, inputName, inputRoom, rooms,
  } = props;
  return (
    <div>
      <div>
        <input id="name" ref={inputName} required placeholder="What is youur name .." />
        <br />
        <input id="room" ref={inputRoom} required placeholder="What is your room .." />
        <br />
        <button type="submit" onClick={handleSubmit}>Submit</button>
      </div>
      <div>
        <h2>Join an existing room :</h2>
        {mapRooms(rooms)}
      </div>
    </div>
  );
};

export default LoginForm;
