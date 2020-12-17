import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { keys, gameAllowedKeys } from '../../constants/keys';
import useKey from '../../hooks/useKey';
import useInterval from '../../hooks/useInterval';
import { roomStateProp, playerStateProp, settingsProp } from '../../reducers/reducers.types';
import actions from '../../actions';

import GameBoard from '../../components/Game/GameBoard';

const GameBoardContainer = (props) => {
  const {
    player,
    settings,
    reqMoveTetro,
    reqMove
  } = props;
  const { started, pieces, dropTime } = settings;

  // useInterval(() => reqMoveTetro({ keyCode: keys.KDOWN }), dropTime);
  useKey((event) => reqMove({ keyCode: event.keyCode }), gameAllowedKeys, { started: true, loose: false });

  return (
    <GameBoard
      player={player}
      pieces={pieces}
    />
  );
};

GameBoardContainer.propTypes = {
  player: PropTypes.shape(playerStateProp).isRequired,
  settings: PropTypes.shape(settingsProp).isRequired,
  reqMove: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  player: state.player,
  settings: state.game.settings,
});

const mapDispatchToProps = {
  reqStartGame: actions.reqStartGame,
  reqMove: actions.reqMove,
  reqMoveTetro: actions.reqMoveTetro,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameBoardContainer);
