import React from 'react';
import { connect } from 'react-redux';

import HeaderLogo from '../components/headerLogo';
import HeaderInfoUser from '../components/headerInfoUser';
import HeaderInfoSocket from '../components/headerInfoSocket';

const Header = props => {
  return (
    <div style={headerStyle}>
        <HeaderInfoUser
          playerName={props.playerName} 
          playerRoom={props.playerRoom}
        />
        <HeaderLogo />
        <HeaderInfoSocket />
    </div>
  );
}

const headerStyle = {
	display: 'flex',
	flexDirection: 'row',
	flexWrap: 'nowrap',
	justifyContent: 'space-between',
	alignItems: 'baseline',
	alignContent: 'stretch'
}

// const headerInfoStyle = {
//   order: '0',
//   flex: '0 1 auto',
//   alignSelf: 'auto',
//   border: '1px solid black'
// }

// const headerLogoStyle = {
//   order: '0',
//   flex: '1 0 auto',
//   alignSelf: 'auto',
//   border: '1px solid black'
// }

const mapStateToProps = state => ({
	playerName: state.player.playerName,
	playerRoom: state.player.playerRoom
});

export default connect(mapStateToProps, null)(Header);
