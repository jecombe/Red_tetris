import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Stage from './Stage';
import Divider from '@material-ui/core/Divider';

const GameBoard = (props) => {
  const {
    playerStage,
    playerNextPiece,
    move,
  } = props;

  return (
    <Card>
      <CardHeader
        title="Username"
        subheader="Score: 0 - Rank: #"
      />
      <Divider light />
      <CardContent>
        <Grid container justify="center" tabIndex="0" onKeyDown={(e) => move(e)} spacing={2}>
          <Grid item xs={6} lg={9} container justify="center" alignItems="center">
            {playerStage && playerStage.length
            && <Stage stage={playerStage} />}
          </Grid>
          <Grid item xs={6} lg={3} container justify="center" style={{ height: '20vh' }}>
            {playerNextPiece && playerNextPiece.length
            && <Stage stage={playerNextPiece} /> }
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

GameBoard.propTypes = {
  playerStage: PropTypes.arrayOf(PropTypes.string).isRequired,
  playerNextPiece: PropTypes.arrayOf(PropTypes.string).isRequired,
  move: PropTypes.func.isRequired,
};

export default GameBoard;
