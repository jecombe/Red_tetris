import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import { createStagePiece, updateStage } from '../../../../shared/stage';
import { playerStateProp, settingsProp } from '../../../reducers/reducers.types';

import Stage from '../../Common/Stage';

const useStyles = makeStyles({
  boardBox: {
    height: '100%',
  },
  boardCard: {
    height: '100%',
  },
  subheader: {
    fontWeight: 'bold',
    marginTop: '5%',
  },
});

const GameBoardPieces = (props) => {
  const { pieces, nbPiece } = props;
  const classes = useStyles();

  const renderPieceStage = (piece) => {
    let stagePiece;

    if (piece) {
      stagePiece = updateStage(piece, createStagePiece(), 0, 0, false);
    } else {
      stagePiece = createStagePiece();
    }

    return <Stage stage={stagePiece} type="stagePiece" />;
  };

  return (
    <Box>
      {/* <Typography align="center" className={classes.subheader}>
        Next
      </Typography> */}
      <Card elevation={0} square>
        <CardContent>
          <Grid container direction="column" spacing={1}>
            <Grid item>{renderPieceStage(pieces[nbPiece + 1])}</Grid>
            <Grid item>{renderPieceStage(pieces[nbPiece + 2])}</Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

GameBoardPieces.propTypes = {
  pieces: settingsProp.pieces.isRequired,
  nbPiece: playerStateProp.nbPiece.isRequired,
};

export default GameBoardPieces;
