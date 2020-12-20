import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import { createStage } from '../../../../shared/stage';

// import { createStagePiece, updateStage } from '../../../../shared/stage';
import { playerStateProp } from '../../../reducers/reducers.types';

import Stage from '../Stage';

const useStyles = makeStyles({
  boardBox: {
    height: '100%',
  },
  boardCard: {
    height: '100%',
  },
});

const GameBoardStage = (props) => {
  const {
    stage,
  } = props;
  const classes = useStyles();

  return (
    <Grid container alignItems="center" className={classes.boardBox}>

      {/* <Card elevation={0} square style={{ width: '100%' }}> */}
      <CardContent>
        <Stage
          stage={stage || createStage()}
        />
      </CardContent>
      {/* </Card> */}
    </Grid>
  );
};

GameBoardStage.propTypes = {
  stage: playerStateProp.stage.isRequired,
};

export default GameBoardStage;
