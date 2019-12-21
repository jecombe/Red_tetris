/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

import { TETROMINOS } from './tetrominos';

const useStyles = makeStyles(() => ({
  stage: (props) => ({
    display: 'grid',
    gridTemplateRows: `repeat(
      ${props.height},
      calc(${props.size}vh / ${props.width}))`,
    gridTemplateColumns: `repeat(${props.width}, 1fr)`,
    gridGap: '1px',
    border: '2px solid black',
    width: '25vw',
    background: '#111',
  }),
  cell: (props) => ({
    width: 'auto',
    background: `rgba(${props.color}, 0.8)`,
    border: `${props.type === 0 ? '0px solid' : '4px solid'}`,
    borderBottomColor: `rgba(${props.color}, 0.1)`,
    borderRightColor: `rgba(${props.color}, 1)`,
    borderTopColor: `rgba(${props.color}, 1)`,
    borderLeftColor: `rgba(${props.color}, 0.3)`,
  }),
}));

const Cell = (props) => {
  const { type } = props;
  const style = {
    type,
    color: TETROMINOS[type].color,
  };
  const classes = useStyles(style);

  return (
    <Box className={classes.cell} />
  );
};

Cell.propTypes = {
  type: PropTypes.number.isRequired,
};

const Stage = (props) => {

  const { stage, type } = props;

  let size = 35;
  if (type === 'other') size = '3';
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
