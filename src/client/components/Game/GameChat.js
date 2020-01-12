import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import { connect } from 'react-redux';

import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';

import Stage from './Stage';

const GameChatMap = (playerOtherStage) => {
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

const GameChat = (props) => {
  const { playerOtherStage } = props;

  return (
    <Grid container justify="center">
      <Typography component="h1" variant="h5">
            Users in room
      </Typography>
      <Grid item xs={12} style={{ maxHeight: '50vh', overflow: 'auto', width: '100%' }}>
        <List style={{ maxHeight: '100%' }}>
          {GameChatMap(playerOtherStage)}
        </List>
      </Grid>
    </Grid>
  );
};

GameChat.propTypes = {
  playerOtherStage: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  playerOtherStage: state.player.playerOtherStage,
});

export default connect(mapStateToProps, null)(GameChat);
