import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';

import GameInput from './GameInput';
import GameButton from './GameButton';

const GameSettingsBar = (props) => {
  const {
    playerOwner,
    playerDropTime,
    handleStart,
  } = props;

  const isOwner = (playerOwner === false ? ' not ' : '');

  const handleThisNigga = () => {
    alert('boo !');
  };

  return (
    <Grid container direction="column" justify="center" spacing>
      <Grid item xs={12} container justify="center" spacing>
        <Typography component="h1" variant="h5">
          Game Settings
        </Typography>
      </Grid>
      <Paper>
        <Grid item xs={8} container direction="column" justify="center" spacing>
          <Grid item xs={6}>
            <InputLabel htmlFor="my-input">Email address</InputLabel>
            <GameInput
              label="gravity"
            />
          </Grid>
          <Grid item xs={6}>
            <InputLabel htmlFor="my-input">Gravity</InputLabel>
            <GameInput
              label={playerDropTime}
            />
          </Grid>
        </Grid>
      </Paper>
      <Grid item xs={4}>
        <GameButton
          handleSubmit={handleStart}
          buttonDisabled={!playerOwner}
        />
      </Grid>
    </Grid>
  );
};

GameSettingsBar.propTypes = {
  playerOwner: PropTypes.bool.isRequired,
  playerDropTime: PropTypes.number.isRequired,
  handleStart: PropTypes.func.isRequired,
};

export default GameSettingsBar;
