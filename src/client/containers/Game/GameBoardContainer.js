import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { keys } from '../../constants/keys';
import useKey from '../../hooks/useKey';
import useInterval from '../../hooks/useInterval';
import { playerStateProp, settingsProp } from '../../reducers/reducers.types';
import actions from '../../actions';

import GameBoard from '../../components/Game/GameBoard';
import GameLoose from '../../components/Game/GameLoose';

const GameBoardContainer = (props) => {
  const { settings, player, reqMove } = props;
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (player.loose === true) setOpen(player.loose);
  }, [player.loose]);

  const handleCloseLoose = () => {
    setOpen(false);
  };

  useInterval(() => reqMove({ keyCode: keys.KDOWN }), player.dropTime);
  useKey((event) => reqMove({ keyCode: event.keyCode }));

  return (
    <>
      <GameBoard
        stage={player.stage}
        pieceOne={player.stagePiece[0]}
        pieceTwo={player.stagePiece[1]}
        score={player.score}
        lines={player.lines}
        mallus={player.mallus}
      />
      <GameLoose
        loose={player.loose}
        rank={player.rank}
        nbPlayers={settings.nbPlayers}
        open={open}
        handleClose={handleCloseLoose}
      />
    </>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(GameBoardContainer);
