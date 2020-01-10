import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import { connect } from 'react-redux';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import Stage from './Stage';

const GameInfoMap = (playerOtherStage) => {
  if (playerOtherStage.length === 0) {
    return (
      <div>
        No users in room
      </div>
    );
  }
  return playerOtherStage.map((stage) => (
    <Card style={{ padding: '2px' }}>
      <ListItem>
        <ListItemText primary="Name" />
        <ListItemText primary="Score - Rank #" />
        <Stage stage={stage} type="other" />
      </ListItem>
    </Card>
  ));
};

const GamePlayers = (props) => {
  const { playerOtherStage } = props;

  return (
    <Grid container justify="center" style={{ width: '100%', border: '1px solid black' }}>
      <Typography component="h1" variant="h5">
            Users in room
      </Typography>
      <Grid item xs={12} style={{ maxHeight: '50vh', overflow: 'auto', width: '100%' }}>
        <List style={{ maxHeight: '100%' }}>
          {GameInfoMap(playerOtherStage)}
        </List>
      </Grid>
    </Grid>
  );
};

GamePlayers.propTypes = {
  playerOtherStage: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  playerOtherStage: state.player.playerOtherStage,
});

export default connect(mapStateToProps, null)(GamePlayers);
