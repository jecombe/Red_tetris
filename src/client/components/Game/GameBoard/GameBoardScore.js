import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import { playerStateProp } from '../../../reducers/reducers.types';

import BoxInfo from '../../Common/BoxInfo';

const useStyles = makeStyles({
  item: {
    fontWeight: 'bold',
  },
  boardScoreBox: {
    height: '100%',
    width: '100%',
    border: '1px solid blue'
  },
});

const renderItem = (field, value) => (
  <Grid item xs={12}>
    <BoxInfo field={field} value={value} />
  </Grid>
);

const GameBoardScore = (props) => {
  const {
    name, score, level, lines, rank,
  } = props;
  const classes = useStyles();

  return (
    // <Grid container alignItems="flex-end" justify="flex-end" className={classes.boardScoreBox}>
      <Card elevation={0} square>
        <CardContent>
          <Grid container spacing={1}>
            {renderItem('score', score, classes.item)}
            {renderItem('level', level, classes.item)}
            {renderItem('lines', lines, classes.item)}
            {renderItem('rank', rank, classes.item)}
          </Grid>
        </CardContent>
      </Card>
    // </Grid>
  );
};

GameBoardScore.propTypes = {
  name: playerStateProp.name.isRequired,
  score: playerStateProp.score.isRequired,
  level: playerStateProp.level.isRequired,
  lines: playerStateProp.lines.isRequired,
  rank: playerStateProp.rank.isRequired,
};

export default GameBoardScore;
