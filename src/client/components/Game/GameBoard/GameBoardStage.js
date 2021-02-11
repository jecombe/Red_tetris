import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

import { createStage } from '../../../../shared/stage';

import { playerStateProp } from '../../../reducers/reducers.types';

import Stage from '../../Common/Stage';

const useStyles = makeStyles({
  root: {
    padding: '3%',
  },
});

const GameBoardStage = (props) => {
  const { stage } = props;
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Stage stage={stage || createStage()} />
    </Box>
  );
};

GameBoardStage.propTypes = {
  stage: playerStateProp.stage.isRequired,
};

export default GameBoardStage;
