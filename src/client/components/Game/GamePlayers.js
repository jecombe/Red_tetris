import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Stage from './Stage';

const GameInfoMap = (playerOtherStage) => {
  if (playerOtherStage.length === 0) {
    return (
      <Grid container item justify="center">
        No users in room
      </Grid>
    );
  }
  return playerOtherStage.map((stage) => (
    <ListItem>
      <Grid container justify="center" alignItems="center" width="100%">
        <Grid item xs={3}>
            Name
        </Grid>
        <Grid item xs={3}>
            Score
        </Grid>
        <Grid item xs={3}>
            Rank
        </Grid>
        <Grid item xs={3}>
          <Stage stage={stage} type="other" />
        </Grid>
      </Grid>
    </ListItem>
  ));
};

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

const GamePlayers = (props) => {
  const {
    playerName,
    playerRoom,
    playerOtherStage
  } = props;
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.root}>
        <Typography component="h2" variant="h5">
            Users in room
        </Typography>
        <Grid item xs={12} style={{ maxHeight: '50vh', overflow: 'auto', width: '100%' }}>
            <List style={{ maxHeight: '100%' }}>
              {GameInfoMap(playerOtherStage)}
            </List>
            </Grid>
      </div>
      <div className={classes.root}>
      <Typography component="h2" variant="h5">
          Users in room
      </Typography>
      <Grid item xs={12} style={{ maxHeight: '50vh', overflow: 'auto', width: '100%' }}>
          <List style={{ maxHeight: '100%' }}>
            {GameInfoMap(playerOtherStage)}
          </List>
          </Grid>
    </div>
    </Container>
  );
};

GamePlayers.propTypes = {
  playerName: PropTypes.string.isRequired,
  playerRoom: PropTypes.string.isRequired,
  playerOtherStage: PropTypes.array.isRequired,
};

export default GamePlayers;
