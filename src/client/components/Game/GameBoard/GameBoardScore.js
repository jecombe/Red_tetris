import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import { playerStateProp } from '../../../reducers/reducers.types';

import BoxInfo from '../../Common/BoxInfo';

const useStyles = makeStyles({
  item: {
    fontWeight: 'bold',
  },
  boardScoreBox: {
    height: '100%',
    width: '100%',
    border: '1px solid blue',
  },
  subheader: {
    fontWeight: 'bold',
    marginTop: '2%',
  },
});

const renderItem = (field, value) => (
  <Grid item xs={12}>
    <BoxInfo field={field} value={value} dark />
  </Grid>
);

const GameBoardScore = (props) => {
  const { score, level, lines, mallus } = props;
  const classes = useStyles();

  return (
    <Card elevation={0} square>
      <CardContent>
        <Grid container spacing={1}>
          {renderItem('score', score, classes.item)}
          {renderItem('level', level, classes.item)}
          {renderItem('lines', lines, classes.item)}
          {renderItem('mallus', mallus, classes.item)}
        </Grid>
      </CardContent>
    </Card>
  );
};

GameBoardScore.propTypes = {
  score: playerStateProp.score.isRequired,
  level: playerStateProp.level.isRequired,
  lines: playerStateProp.lines.isRequired,
  mallus: playerStateProp.mallus.isRequired,
};

export default GameBoardScore;
