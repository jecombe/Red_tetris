import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { playerStateProp, roomStatePropTypes } from '../../reducers/reducers.types';

import GameRoomInfos from './GameRoom/GameRoomInfos';
import GameRoomPlayers from './GameRoom/GameRoomPlayers';

const useStyles = makeStyles({
    grid: {
        height: '100%'
    },
    gridItemInfos: {
        height: '33%'
    }
});

const GameRoom = (props) => {
    const { name, game, handleStart, handleSetOwner } = props;
    const classes = useStyles();

    return (
        <Grid container direction="column" className={classes.grid}>
            <Grid item xs className={classes.gridItemInfos}>
                <GameRoomInfos
                    name={name}
                    room={game.room}
                    owner={game.settings.owner}
                    started={game.started}
                    handleStart={handleStart}
                />
            </Grid>
            <Grid item xs>
                <GameRoomPlayers
                    name={name}
                    owner={game.settings.owner}
                    players={game.players}
                    handleSetOwner={handleSetOwner}
                />
            </Grid>
        </Grid>
    );
};

GameRoom.propTypes = {
    name: playerStateProp.name.isRequired,
    game: roomStatePropTypes.isRequired,
    handleStart: PropTypes.func.isRequired,
    handleSetOwner: PropTypes.func.isRequired
};

export default GameRoom;
