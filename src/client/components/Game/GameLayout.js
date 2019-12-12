import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';

import Stage from './Stage';
import GameStatus from './gameStatus';

const useStyles = makeStyles((theme) => ({
  gameLayout: {
    display: 'flex',
    flexGrow: '1',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100vw',
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
}));

const GameLayout = (props) => {
  const {
    move,
    playerStage,
    playerNextPiece,
    handleSubmitStatus,
  } = props;
  const classes = useStyles();

  return (
    <Card className={classes.gameLayout} onKeyDown={(e) => move(e)}>
      {playerStage && playerStage.length
        && <Stage tabIndex="0" stage={playerStage} /> }
      {playerNextPiece && playerNextPiece.length
        && <Stage stage={playerNextPiece} /> }
      <GameStatus handleSubmit={handleSubmitStatus} />
    </Card>
  );
};

GameLayout.propTypes = {
  move: PropTypes.func.isRequired,
  playerStage: PropTypes.arrayOf(PropTypes.string).isRequired,
  playerNextPiece: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleSubmitStatus: PropTypes.func.isRequired,
};

export default GameLayout;
