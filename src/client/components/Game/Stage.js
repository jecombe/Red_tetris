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
      calc(20vw / ${props.width}))`,
    gridTemplateColumns: `repeat(${props.width}, 1fr)`,
    gridGap: '1px',
    border: '4px solid red',
    width: '100%',
    maxWidth: '25vw',
    background: '#111',
  }),
}));

const Stage = (props) => {
  const { stage } = props;
  const style = {
    width: stage[0].length,
    height: stage.length,
  };
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
