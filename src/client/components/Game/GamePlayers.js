import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import { connect } from 'react-redux';

import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';

import Stage from './Stage';

const GameInfoMap = (playerOtherStage, playerName) => {

  return playerOtherStage.map((stage) => (
    <>
  

    {stage.login !== playerName ? (
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
                <Stage stage={stage.stage} type="other" />
              </Grid>
            </Grid>
          </ListItem>
        </Card>
        ) :  <h1>Me</h1>}

    
    </>
  ));
};

const GamePlayers = (props) => {
  const { playerOtherStage, playerName } = props;

  return (
    <Grid container justify="center">
      <Typography component="h1" variant="h5">
            Users in room
      </Typography>
      <Grid item xs={12} style={{ maxHeight: '50vh', overflow: 'auto', width: '100%' }}>
        <List style={{ maxHeight: '100%' }}>
          {GameInfoMap(playerOtherStage, playerName)}
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
  playerName: state.player.playerName,
});

export default connect(mapStateToProps, null)(GamePlayers);
