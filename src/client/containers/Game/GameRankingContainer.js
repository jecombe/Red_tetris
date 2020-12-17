import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { playersStatePropTypes } from '../../reducers/reducers.types';
import actions from '../../actions';

import GameRankingList from '../../components/Game/GameRanking/GameRankingList';

const GameRankingContainer = (props) => {
  const {
    status,
    players,
    reqGameStopped,
  } = props;

  return (
    <GameRankingList
      status={status}
      players={players}
      reqGameStopped={reqGameStopped}
    />
  );
};

GameRankingContainer.propTypes = {
  status: PropTypes.string.isRequired,
  players: playersStatePropTypes.isRequired,
  reqGameStopped: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  status: state.game.status,
  players: state.game.players,
});

const mapDispatchToProps = {
  reqGameStopped: actions.reqGameStopped,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameRankingContainer);
