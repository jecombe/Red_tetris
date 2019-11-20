import React from 'react';

const HeaderInfoUser = props => {
    let { playerName, playerRoom } = props;
    
    if (!playerName) {
        playerName = "Anonymous";  
    }

    if (!playerRoom) {
        playerRoom = "You are not in a room !"
    } else {
        playerRoom = `You are in ${playerRoom} room !`
    }

    return (
        <div style={headerInfoUserStyle}>
            Welcome, {playerName}!
            <br />
            {playerRoom}
        </div>
    );
};

const headerInfoUserStyle = {
//   order: '0',
//   flex: '0 1 auto',
//   alignSelf: 'auto',
  border: '1px solid black'
}

export default HeaderInfoUser;