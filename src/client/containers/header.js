import React from 'react';
import { connect } from 'react-redux';

import HeaderBar from '../components/headerBar';

const Header = (props) => (
  <HeaderBar
    playerName={props.playerName}
    playerRoom={props.playerRoom}
    connexion={props.connexion}
  />
);

const mapStateToProps = (state) => ({
  playerName: state.player.playerName,
  playerRoom: state.player.playerRoom,
  connexion: state.app.connexion,
});

export default connect(mapStateToProps)(Header);
