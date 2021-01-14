import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';

import { playerStatePropTypes, settingsProp } from '../../reducers/reducers.types';

import GameBoardScore from './GameBoard/GameBoardScore';
import GameBoardPieces from './GameBoard/GameBoardPieces';
import GameBoardStage from './GameBoard/GameBoardStage';

const useStyles = makeStyles({
    root: {
        height: '100%',
        width: '100%'
    }
});

const GameBoard = (props) => {
    const { player, pieces } = props;
    const classes = useStyles();

    return (
        <Card>
            <Grid container justify="center" alignItems="center" className={classes.root}>
                <Grid item xs={8}>
                    <GameBoardStage stage={player.stage} />
                </Grid>
                <Grid item xs={4}>
                    <Grid container direction="column" justify="flex-start">
                        <Grid item xs>
                            <GameBoardPieces pieces={pieces} nbPiece={player.nbPiece} />
                        </Grid>
                        <Divider variant="middle" />
                        <Grid item xs>
                            <GameBoardScore
                                score={player.score}
                                level={player.level}
                                lines={player.lines}
                                rank={player.rank}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    );
};

GameBoard.propTypes = {
    player: playerStatePropTypes.isRequired,
    pieces: settingsProp.pieces.isRequired
};

export default GameBoard;
