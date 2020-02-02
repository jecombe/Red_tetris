import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import GamePlayers from '../../components/Game/GamePlayers';

const GamePlayersConnect = (props) => {
  const {
    playerName,
    playerRoom,
    playerOtherStage,
  } = props;

  return (
    <GamePlayers
      playerName={playerName}
      playerRoom={playerRoom}
      playerOtherStage={playerOtherStage}
    />
  );
};

GamePlayersConnect.propTypes = {
  playerName: PropTypes.string.isRequired,
  playerRoom: PropTypes.string.isRequired,
  playerOtherStage: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  playerName: state.player.playerName,
  playerRoom: state.player.playerRoom,
  playerOtherStage: state.player.playerOtherStage,
});

export default connect(mapStateToProps, null)(GamePlayersConnect);
