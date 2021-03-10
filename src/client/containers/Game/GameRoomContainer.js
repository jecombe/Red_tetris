import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { playerStateProp, gameStatePropTypes } from '../../reducers/reducers.types';
import actions from '../../actions';

import GameRoom from '../../components/Game/GameRoom';
import GameRank from '../../components/Game/GameRank';

const GameRoomContainer = (props) => {
  const { name, game, reqStartGame, reqOwner } = props;
  const [open, setOpen] = React.useState(false);

  const handleStart = () => reqStartGame({ name, room: game.room });
  const handleSetOwner = (newOwner) => {
    console.log(newOwner);
    reqOwner({ newOwner });
  };

  React.useEffect(() => {
    if (game.settings.nbPlayers !== 0 && game.settings.nbLoosers === game.settings.nbPlayers) setOpen(true);
    else setOpen(false);
  }, [game.settings.nbLoosers, game.settings.nbPlayers]);

  const handleOpenRank = () => {
    setOpen(true);
  };

  const handleCloseRank = () => {
    setOpen(false);
  };

  return (
    <>
      <GameRoom
        name={name}
        game={game}
        room={game.room}
        owner={game.settings.owner}
        started={game.settings.started}
        players={game.players}
        handleStart={handleStart}
        handleOpen={handleOpenRank}
      />
      <GameRank
        nbPlayers={game.settings.nbPlayers}
        nbLoosers={game.settings.nbLoosers}
        players={game.players}
        open={open}
        handleClose={handleCloseRank}
        handleSetOwner={handleSetOwner}
      />
    </>
  );
};

GameRoomContainer.propTypes = {
  name: playerStateProp.name.isRequired,
  game: gameStatePropTypes.isRequired,
  reqStartGame: PropTypes.func.isRequired,
  reqOwner: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  game: state.game,
});

const mapDispatchToProps = {
  reqStartGame: actions.reqStartGame,
  reqOwner: actions.reqOwner,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameRoomContainer);
