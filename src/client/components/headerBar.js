import React from 'react';
import { FiUser, FiHome, FiToggleLeft, FiToggleRight } from "react-icons/fi";
import logo from '../img/header.png';
import { strictEqual } from 'assert';

const HeaderBar = props => {
    let { playerName, playerRoom, connexion } = props;
    
    if (!playerName) playerName = "Anonymous"
    if (!playerRoom) playerRoom = "No room"
    if (connexion === false) connexion = <span style={{ color: "red", marginLeft: "5px" }}> <FiToggleLeft /> </span>
    else connexion = <span style={{ color: "green", marginLeft: "5px" }}> <FiToggleRight /> </span>

    return (
        <div style={style.headerStyle}>
            <div style={style.HeaderBarLoginStyle}>
                <div style={style.HeaderBarLoginChildStyle}>
                    <span style={{ marginRight: "5px" }}> <FiUser /> </span>{playerName}
                </div>
                <div style={style.HeaderBarLoginChildStyle}>
                    <span style={{ marginRight: "5px" }}> <FiHome /> </span> {playerRoom}
                </div>
            </div>
            <div style={style.HeaderBarImgStyle}>
                <img src={logo} width="100%" alt="Logo" />
            </div>
            <div style={style.HeaderBarSocketStyle}>
                Online : {connexion}
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
        justifyContent: 'center',
    },
    HeaderBarLoginChildStyle : {
        border: '1px solid blue',
        display: 'flex',
        alignItems: 'center',
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
        alignItems: 'center',
    },
    headerBarSocketConnexionStyle: {
        
    }
}

export default HeaderBar;