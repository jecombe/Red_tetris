import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';

import Stage from './Stage';
import StageTetro from './StageTetro';
import GameStatus from './gameStatus';

const GameLayout = (props) => {
  const {
    move,
    playerStage,
    playerNextPiece,
    handleSubmitStatus
  } = props;

  return (
    <Card style={style.gameLayout} onKeyDown={(e) => move(e)}>
      {playerStage && playerStage.length &&
        <Stage tabIndex="0" stage={playerStage} /> }
      {playerNextPiece && playerNextPiece.length &&
        <StageTetro stage={playerNextPiece} /> }
      <GameStatus handleSubmit={handleSubmitStatus} />
    </Card>
  );
};

const style = {
  gameLayout: {
    display: 'flex',
    flexGrow: '1',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100vw',
  },
};

GameLayout.propTypes = {
  move: PropTypes.func.isRequired,
  playerStage: PropTypes.arrayOf(PropTypes.string).isRequired,
  playerNextPiece: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleSubmitStatus: PropTypes.func.isRequired,
};

export default GameLayout;
