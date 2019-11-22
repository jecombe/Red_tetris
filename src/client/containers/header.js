import React from 'react';
import { connect } from 'react-redux';

import HeaderBar from '../components/headerBar';

const Header = props => {
  return (
    <div style={style.HeaderStyle}>
      <HeaderBar 
        playerName={props.playerName} 
        playerRoom={props.playerRoom} 
      />
    </div>
  );
};

const style = {
  HeaderStyle: {
    minHeight: '10vh',
    border: '1px solid black',
    display: 'flex',
    alignItems: 'center',
  }
}

const mapStateToProps = state => ({
	playerName: state.player.playerName,
	playerRoom: state.player.playerRoom
});

export default connect(mapStateToProps)(Header);
