import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { playerStateProp, playersStatePropTypes } from '../../reducers/reducers.types';
import GamePlayersRank from '../../components/Game/GamePlayers/GamePlayersRank';

const GamePlayersContainer = (props) => {
    const { name, players } = props;

    return <GamePlayersRank name={name} players={players} />;
};

GamePlayersContainer.propTypes = {
    name: playerStateProp.name.isRequired,
    players: playersStatePropTypes.isRequired
};

const mapStateToProps = (state) => ({
    name: state.player.name,
    players: state.game.players
});

export default connect(mapStateToProps)(GamePlayersContainer);
