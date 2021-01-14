import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
    playerStateProp,
    roomStatePropTypes,
    gameStatePropTypes
} from '../../reducers/reducers.types';
import actions from '../../actions';

import GameRoom from '../../components/Game/GameRoom';

const GameRoomContainer = (props) => {
    const { name, game, reqStartGame, reqOwner, reqGameStopped } = props;

    const handleStart = () => reqStartGame({ name, room: game.room });
    const handleSetOwner = (value) => reqOwner({ newOwner: value.name });

    return (
        <GameRoom
            name={name}
            game={game}
            handleStart={handleStart}
            handleSetOwner={handleSetOwner}
        />
    );
};

GameRoomContainer.propTypes = {
    name: playerStateProp.name.isRequired,
    room: gameStatePropTypes.isRequired,
    reqStartGame: PropTypes.func.isRequired,
    reqOwner: PropTypes.func.isRequired,
    reqGameStopped: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    name: state.player.name,
    game: state.game
});

const mapDispatchToProps = {
    reqStartGame: actions.reqStartGame,
    reqOwner: actions.reqOwner,
    reqGameStopped: actions.reqGameStopped
};

export default connect(mapStateToProps, mapDispatchToProps)(GameRoomContainer);
