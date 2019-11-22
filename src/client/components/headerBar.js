import React from 'react';
import logo from '../img/header3.png';

const HeaderBar = props => {
    let { playerName, playerRoom } = props;
    
    if (!playerName) playerName = "Anonymous"

    if (!playerRoom) playerRoom = "You are not in a room !"
    else playerRoom = `You are in ${playerRoom} room !`

    return (
        <div style={style.headerStyle}>
            <div style={style.headerInfoStyle}>
                Welcome, {playerName}!
                <br />
                {playerRoom}
            </div>
            <div>
                <img src={logo} style={style.headerLogoImgStyle} alt="Logo" />
            </div>
            <div style={style.headerInfoStyle}>
                Socket connection
            </div>
        </div>
    );
};

const style = {
    headerStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    headerInfoStyle: {
        border: '1px solid black'
    },
    headerLogoImgStyle: {
        width: '50%'
    }
}

export default HeaderBar;