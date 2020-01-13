import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';

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
    <Card style={{ margin: '2px' }}>
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
    </Card>
  ));
};

const GamePlayers = (props) => {
  const { playerOtherStage } = props;

  return (
    <Paper>
      <Grid container justify="center">
        <Typography component="h1" variant="h5">
              Users in room
        </Typography>
        <Grid item xs={12} style={{ maxHeight: '50vh', overflow: 'auto', width: '100%' }}>
          <List style={{ maxHeight: '100%' }}>
            {GameInfoMap(playerOtherStage)}
          </List>
        </Grid>
      </Grid>
    </Paper>
  );
};

GamePlayers.propTypes = {
  playerOtherStage: PropTypes.array.isRequired,
};

export default GamePlayers;
