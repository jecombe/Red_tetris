import React from 'react';
import logo from '../img/header3.png';

const HeaderBar = props => {
    let { playerName, playerRoom } = props;
    
    if (!playerName) playerName = "Anonymous"

    if (!playerRoom) playerRoom = "You are not in a room !"
    else playerRoom = `You are in ${playerRoom} room !`

    return (
        <div style={style.headerStyle}>
            <div style={style.headerInfoSocketStyle}>
                Welcome, {playerName}!
                <br />
                {playerRoom}
            </div>
            <div style={style.headerLogoStyle}>
                <img style={style.headerLogoImgStyle} src={logo} alt="Logo" />
            </div>
            <div style={style.headerInfoSocketStyle}>
                Socket connection
            </div>
        </div>
    );
};

const style = {
    headerStyle: {
        display: 'flex'
    },
    headerLogoStyle: {
        // display: "flex",
        // justifyContent: "center",
        // padding: '0.5%',
        // width: '100%',
        border: '1px solid black'
    },
    headerLogoImgStyle: {
        width: '20%'
    },
    headerInfoSocketStyle: {
        //   order: '0',
        //   flex: '0 1 auto',
        //   alignSelf: 'auto',
        border: '1px solid black'
    }
}

export default HeaderBar;