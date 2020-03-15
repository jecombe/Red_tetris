import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import GamePlayers from '../../components/Game/GamePlayers';

const GamePlayersConnect = (props) => {
  const {
    playerName,
    playerGameOver,
    playerWin,
    playerOtherStage,
  } = props;

  return (
    <GamePlayers
      playerName={playerName}
      playerGameOver={playerGameOver}
      playerWin={playerWin}
      playerOtherStage={playerOtherStage}
    />
  );
};

GamePlayersConnect.propTypes = {
  playerName: PropTypes.string.isRequired,
  playerGameOver: PropTypes.bool.isRequired,
  playerWin: PropTypes.bool.isRequired,
  playerOtherStage: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  playerName: state.player.playerName,
  playerGameOver: state.player.playerGameOver,
  playerWin: state.player.playerWin,
  playerOtherStage: state.player.playerOtherStage,
});

export default connect(mapStateToProps)(GamePlayersConnect);
