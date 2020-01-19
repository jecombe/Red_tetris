import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import RedInput from '../RedInput';
import RedButton from '../RedButton';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const GameSettings = (props) => {
  const {
    playerOwner,
    playerDropTime,
    handleStart,
    handleSettings,
  } = props;
  const classes = useStyles();

  const isAvailabe = false; // (playerOwner === false ? ' not ' : '');

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.root}>
        <Typography component="h1" variant="h5">
          Game settings
        </Typography>
        <Box className={classes.form}>
          { !isAvailabe
            ? (
              <Typography variant="body2">
              Not available
              </Typography>
            )
            : (
              <div>
                <RedInput
                  label="playerDropTime"
                  name="playerDropTime"
                  defaultValue={playerDropTime}
                  disabled={!playerOwner}
                />
                <RedButton
                  name="Set settings"
                  handleSubmit={handleSettings}
                  disabled={!playerOwner}
                />
              </div>
            )}
        </Box>
        <RedButton
          name="Start Game"
          handleSubmit={handleStart}
          disabled={!playerOwner}
        />
      </div>
    </Container>
  );
};

GameSettings.propTypes = {
  playerOwner: PropTypes.bool.isRequired,
  playerDropTime: PropTypes.number.isRequired,
  handleStart: PropTypes.func.isRequired,
  handleSettings: PropTypes.func.isRequired,
};

export default GameSettings;
