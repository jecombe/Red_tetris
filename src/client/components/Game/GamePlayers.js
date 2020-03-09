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


    <Card style={{ margin: '2px', opacity: '0.8' }}>
      <ListItem>
        <Grid container justify="center" alignItems="center" width="100%">
          <Grid item xs={3}>
            Name: {stage.login}
          </Grid>
          <Grid item xs={3}>
            Line Full: {stage.lineFull}
          </Grid>
          <Grid item xs={3}>
            Mallus: {stage.mallus}
          </Grid>
          <Grid item xs={3}>
            {stage.login !== playerName ? (
              <Stage stage={stage.stage} type="other" />
            ) : <h1>Me</h1>}
          </Grid>
        </Grid>
      </ListItem>
    </Card>
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
