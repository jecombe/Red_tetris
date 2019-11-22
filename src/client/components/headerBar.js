import React from 'react';
import { FiUser, FiHome } from "react-icons/fi";
import logo from '../img/header.png';

const HeaderBar = props => {
    let { playerName, playerRoom } = props;
    
    if (!playerName) playerName = "Anonymous"
    if (!playerRoom) playerRoom = "No room"

    return (
        <div style={style.headerStyle}>
            <div style={style.HeaderBarLoginStyle}>
                <div>
                    <FiUser /> {playerName}
                </div>
                <div>
                    <FiHome /> {playerRoom}
                </div>
            </div>
            <div style={style.HeaderBarImgStyle}>
                <img src={logo} width="100%" alt="Logo" />
            </div>
            <div style={style.HeaderBarSocketStyle}>
                Online
            </div>
        </div>
    );
};

const style = {
    headerStyle: {
        border: '1px solid blue',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        fontSize: '26px',
        flexGrow: '1'
    },
    HeaderBarLoginStyle : {
        border: '1px solid blue',
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'center'
    },
    HeaderBarImgStyle : {
        border: '1px solid blue',
        display: 'flex',
        justifyContent: 'center',
    },
    HeaderBarSocketStyle: {
        border: '1px solid blue',
        display: 'flex',
        justifyContent: 'center',
    }
}

export default HeaderBar;