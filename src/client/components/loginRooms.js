import React from 'react';

const getMappedData = (rooms) => {
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

const LoginRooms = props => {
  const { rooms } = props;
  return (
    <div style={loginRoomsStyle}> 
      {getMappedData(rooms)}
    </div>
  );
};

const loginRoomsStyle = {
  border: '1px solid blue',
  textAlign: 'center',
  margin: 'auto',
  width: '70%'
}

export default LoginRooms;