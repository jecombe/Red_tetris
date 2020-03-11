import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';

import GameBoard from '../components/Game/GameBoard';
import GamePlayers from '../components/Game/GamePlayers';
import GameStart from '../components/Game/GameStart'

import styled, { keyframes } from 'styled-components';
import { zoomIn } from 'react-animations';
import Countdown from 'react-countdown-now';


const bounceAnimation = keyframes`${zoomIn}`;

const BouncyDiv = styled.div`
  animation: 1s ${bounceAnimation};
`;

// Renderer callback with condition
const renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return <GameBoard />;
  } else {
    // Render a countdown
    return (
      <BouncyDiv style={mystyle}>
    <h1>{seconds}</h1>
    </BouncyDiv>
    );
  }
};

const Game = (props) => {

  const {
    playerName,
    playerRoom,
    history,
    startGame,

  } = props;

  if (!playerName || !playerRoom) history.push('/');
console.log("START GAEME ", startGame)
    return (
      
      <Grid container justify="center">
        <Grid item xs={12} lg={7}>
          {startGame === true ?  (
          <Countdown date={Date.now() + 5000}
           renderer={renderer} /> 
         
    ) : (
       <GameStart />
      ) } 
          
        </Grid>

        <Grid item xs={12} lg={5} container justify="center">
          <GamePlayers />
        </Grid>
      </Grid>
    );


};

Game.propTypes = {
  playerName: PropTypes.string.isRequired,
  playerRoom: PropTypes.string.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};

const mapStateToProps = (state) => ({
  playerName: state.player.playerName,
  playerRoom: state.player.playerRoom,
  startGame: state.player.startGame,
});



const mystyle = {

  position: "absolute",
  textTransform: "uppercase",
  fontFamily: "verdana",
  fontSize: "12em",
  fontWeight: "700",
  color: "#E8B806",
  textShadow: "1px 1px 1px #919191, 1px 2px 1px #919191, 1px 3px 1px #919191, 1px 4px 1px #919191, 1px 5px 1px #919191, 1px 6px 1px #919191, 1px 7px 1px #919191,1px 8px 1px #919191,1px 9px 1px #919191,1px 10px 1px #919191,1px 18px 6px rgba(16,16,16,0.4),1px 22px 10px rgba(16,16,16,0.2),1px 25px 35px rgba(16,16,16,0.2),1px 30px 60px rgba(16,16,16,0.4)",


};



export default connect(mapStateToProps, null)(Game);
