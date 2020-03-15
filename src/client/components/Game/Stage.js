/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

import Cell from './Cell';

const useStyles = makeStyles(() => ({
  stage: (props) => ({
    display: 'grid',
    gridTemplateRows: `repeat(
      ${props.height},
      calc(${props.size}vh / ${props.width}))`,
    gridTemplateColumns: `repeat(${props.width}, 1fr)`,
    gridGap: '1px',
    border: '2px solid black',
    width: '100%',
    background: '#111',
  }),
}));

const Stage = (props) => {
  const { stage, type } = props;

  let size = 35;
  if (type === 'other') size = '6';
  const style = {
    width: stage[0].length,
    height: stage.length,
    size,
  };
  console.log(style);
  const classes = useStyles(style);

  return (
    <Box className={classes.stage}>
      {stage.map((row) => row.map((cell, x) => <Cell key={x} type={cell[0]} />))}
    </Box>
  );
};

Stage.propTypes = {
  stage: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Stage;
