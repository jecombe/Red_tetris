import React from 'react';
import style from './loginRooms.css';

const getMappedData = (dataProp, dataRoom) => {
     console.log("data room =>" , dataRoom);
    /*if (dataRoom) { 
        console.log(dataRoom);
          return dataRoom.map(item =>{
          return <div key={item.roomName.toString()}>{item.roomName}</div>;
      })
    }
    else {
     return "";
    }*/
}

const LoginRooms = ({ roomList, dataRoom }) => {
  return <div className={style.LoginRooms}> {getMappedData(roomList, dataRoom)} </div>;
};

export default LoginRooms;