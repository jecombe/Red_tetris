import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import { connect } from 'react-redux';

import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';

import Stage from './Stage';


import styled, { keyframes } from 'styled-components';
import { zoomIn } from 'react-animations';

const bounceAnimation = keyframes`${zoomIn}`;

const BouncyDiv = styled.div`
  animation: 1s ${bounceAnimation};
`;

const Rd = (stage, playerName, playerGameOver, playerWin) => {
  if (stage.login !== playerName) {
    if (stage.playerGameOver === false)
      return <Stage stage={stage.stage} type="other" />
    return <h1>GAME OVER</h1>
  }
  else {
    if (playerGameOver === true)
      return (<h1>GAME OVER</h1>)
    else if (playerWin === true)
      return (<h1>WIN</h1>)
    else
      return (<h1>ME</h1>)

  }
}


const GameInfoMap = (playerOtherStage, playerName, playerGameOver, playerWin) => {


  return playerOtherStage.map((stage) => (
    console.log(stage),


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
            {Rd(stage, playerName, playerGameOver, playerWin)}
          </Grid>
        </Grid>
      </ListItem>
    </Card>
  ));
};

const GamePlayers = (props) => {
  const { playerOtherStage, playerName, playerGameOver, playerWin } = props;


  return (

    <Grid container justify="center">
      <Typography component="h1" variant="h5">
        Users in room
               </Typography>
      <Grid item xs={12} style={{ maxHeight: '50vh', overflow: 'auto', width: '100%' }}>
        <List style={{ maxHeight: '100%' }}>
          {GameInfoMap(playerOtherStage, playerName, playerGameOver, playerWin)}
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
  playerGameOver: state.player.playerGameOver,
  playerWin: state.player.playerWin,
});

export default connect(mapStateToProps, null)(GamePlayers);
