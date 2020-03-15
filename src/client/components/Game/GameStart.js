import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import actions from '../../actions';
import GameStatus from './GameStatus';

const GameStart = (props) => {
  const {
    playerOwner,
    reqStartGame,
    playerName,
    playerRoom,
  } = props;

  const handleSubmitStatus = () => {
    // setT(1)
    reqStartGame({ playerName, playerRoom });
  };

  return (

    <>

      {playerOwner ? (
        <GameStatus handleSubmit={handleSubmitStatus} />
      ) : <h1>YOU ARE NOT THE OWNER</h1>}

    </>
  );
};

GameStart.propTypes = {
  playerName: PropTypes.string.isRequired,
  playerRoom: PropTypes.string.isRequired,
  reqStartGame: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  playerName: state.player.playerName,
  playerRoom: state.player.playerRoom,
  playerOwner: state.player.playerOwner,
});

const mapDispatchToProps = {
  reqStartGame: actions.reqStartGame,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameStart);
