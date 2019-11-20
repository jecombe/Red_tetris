import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import HeaderLogo from '../components/headerLogo';

const Header = props => {
  return (
    <div style={headerStyle}>
        {props.playerName}
        {props.playerRoom}
        <HeaderLogo />
    </div>
  );
}

const headerStyle = {
    display: "flex",
    justifyContent: "center",
    padding: '0.5%',
    width: '100%'
}

const mapStateToProps = (state) => ({
	playerName: state.user.playerName,
	playerRoom: state.user.playerRoom,
	rooms: state.user.rooms,
});

export default connect(mapStateToProps, null)(Header);
