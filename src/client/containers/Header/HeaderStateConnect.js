import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import HeaderState from '../../components/Header/HeaderState';

const HeaderStateConnect = (props) => {
  const {
    connected,
    games,
  } = props;

  const nbRooms = Object.keys(games).length;

  return (
    <HeaderState
      connected={connected}
      nbRooms={nbRooms}
    />
  );
};

HeaderStateConnect.propTypes = {
  connected: PropTypes.bool.isRequired,
  games: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  connected: state.app.connected,
  games: state.app.games,
});

export default connect(mapStateToProps)(HeaderStateConnect);
