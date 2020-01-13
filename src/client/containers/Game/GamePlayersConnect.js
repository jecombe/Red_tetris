import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import GamePlayers from '../../components/Game/GamePlayers';

const GamePlayersConnect = (props) => {
  const {
    playerOtherStage,
  } = props;

  return (
    <GamePlayers
      playerOtherStage={playerOtherStage}
    />
  );
};

GamePlayersConnect.propTypes = {
  playerOtherStage: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  playerOtherStage: state.player.playerOtherStage,
});

export default connect(mapStateToProps, null)(GamePlayersConnect);
