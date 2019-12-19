import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import Stage from './Stage';

const GameInfoMap = (infos, playerOtherStage) => {
  if (playerOtherStage.length === 0) {
    return (
      <div>
        No users in room
      </div>
    );
  }
  return playerOtherStage.map((stage) => (
    <ListItem>
      {console.log(stage)}
      <ListItemText primary="Name" secondary="Score  - Rank #" />
      <Stage stage={stage} type="other" />
    </ListItem>
  ));
};

// <ListItemText primary={`${i.name}`} secondary={`Score ${i.score} - Rank #${i.rank}`} />

const GamePlayers = (props) => {
  const { infos, playerOtherStage } = props;

  return (
    <Grid container justify="center">
      <Typography component="h1" variant="h5">
            Users in room
      </Typography>
      <Grid item xs={12} container style={{ maxHeight: '50vh', overflow: 'auto' }}>
        <List style={{ maxHeight: '100%' }}>
          {GameInfoMap(infos, playerOtherStage)}
        </List>
      </Grid>
    </Grid>
  );
};

GamePlayers.propTypes = {
  infos: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    score: PropTypes.string.isRequired,
    rank: PropTypes.string.isRequired,
  })).isRequired,
  playerOtherStage: PropTypes.array.isRequired,
};

export default GamePlayers;
