import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const GameSettingsBar = (props) => {
  const {
    playerOwner,
    playerDropTime,
  } = props;

  const isOwner = (playerOwner === false ? ' not ' : '');

  return (
    <Paper>
      <Grid container item xs={12} justify="center">
        <Typography component="h1" variant="h5">
            Game Settings
        </Typography>
        <Box>
          You are
          { isOwner }
          the owner
        </Box>
        <Box>
          The droptime is
          { playerDropTime }
        </Box>
      </Grid>
    </Paper>
  );
};

GameSettingsBar.propTypes = {
  playerOwner: PropTypes.bool.isRequired,
  playerDropTime: PropTypes.number.isRequired,
};

export default GameSettingsBar;
