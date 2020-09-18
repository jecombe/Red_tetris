import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import styled, { keyframes } from 'styled-components';
import { zoomIn } from 'react-animations';
import Stage from './Stage';

const bounceAnimation = keyframes`${zoomIn}`;

const BouncyDiv = styled.div`
  animation: 1s ${bounceAnimation};
`;

const gameOver = {
  color: '#E50003',
};

const winner = {
  color: '#32E306',
};

const me = {
  color: '#E8B806',
};

const Rd = (stage, playerName, playerGameOver, playerWin) => {
  if (stage.login !== playerName) {
    if (stage.playerGameOver === false) return <Stage stage={stage.stage} type="other" />;
    return <h1 style={gameOver}>GAME OVER</h1>;
  }

  if (playerGameOver === true) return (<h1 style={gameOver}>GAME OVER</h1>);
  if (playerWin === true) return (<h1 style={winner}>WIN</h1>);
  return (<h1 style={me}>ME</h1>);
};

const playersMap = (playerOtherStage, playerName, playerGameOver, playerWin) => {
  return playerOtherStage.map((stage) => (
    <ListItem>
      <Grid container justify="center" alignItems="center" width="100%">
        <Grid item xs={3}>
          {`Name: ${stage.login}`}
        </Grid>
        <Grid item xs={3}>
          {`Line Full: ${stage.lineFull}`}
        </Grid>
        <Grid item xs={3}>
          {`Mallus: ${stage.mallus}`}
        </Grid>
        <Grid item xs={3}>
          {Rd(stage, playerName, playerGameOver, playerWin)}
        </Grid>
      </Grid>
    </ListItem>
  ));
};

const GamePlayers = (props) => {
  const {
    playerOtherStage, playerName, playerGameOver, playerWin,
  } = props;

  return (
    <Card>
      <CardHeader
        title="Players in room"
        subheader={`There is ${playerOtherStage.length} players`}
      />
      <Divider light />
      <CardContent>
        <Grid item xs={12} style={{ maxHeight: 250, overflow: 'auto', width: '100%' }}>
          <List style={{ maxHeight: '100%' }}>
            {playersMap(playerOtherStage, playerName, playerGameOver, playerWin)}
          </List>
        </Grid>
      </CardContent>
    </Card>
  );
};

GamePlayers.propTypes = {
  playerName: PropTypes.string.isRequired,
  playerGameOver: PropTypes.bool.isRequired,
  playerWin: PropTypes.bool.isRequired,
  playerOtherStage: PropTypes.array.isRequired,
};

export default GamePlayers;
