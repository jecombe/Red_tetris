import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { keys } from '../../constants/keys';
import useKey from '../../hooks/useKey';
import useInterval from '../../hooks/useInterval';
import { playerStateProp, settingsProp } from '../../reducers/reducers.types';
import actions from '../../actions';

import GameBoard from '../../components/Game/GameBoard';

const GameBoardContainer = (props) => {
  const { settings, player, reqMove } = props;
  const { started, pieces, dropTime, nbPlayers } = settings;
  const { loose } = player;

  useInterval(() => reqMove({ keyCode: keys.KDOWN }), dropTime, {
    started,
    loose,
  });
  useKey((event) => reqMove({ keyCode: event.keyCode }), { started, loose });

  return <GameBoard player={player} pieces={pieces} nbPlayers={nbPlayers} />;
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
};

export default connect(mapStateToProps, mapDispatchToProps)(GameBoardContainer);
