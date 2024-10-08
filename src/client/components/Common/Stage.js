/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

// import Cell from './Cell';
import { TETROMINOS } from '../../helpers/tetrominos';

const useCellStyles = makeStyles({
  cell: (props) => ({
    width: 'auto',
    background: props.variant !== 'shadow' ? `rgba(${props.color}, 0.8)` : `rgb(0, 0, 0, 0.1)`,
    border: `${props.type === 0 ? '0px solid' : '1px solid'}`,
    borderBottomColor: props.variant !== 'shadow' ? `rgba(${props.color}, 0.1)` : `rgb(${props.color}, 0.8)`,
    borderRightColor: props.variant !== 'shadow' ? `rgba(${props.color}, 1)` : `rgb(${props.color}, 0.8)`,
    borderTopColor: props.variant !== 'shadow' ? `rgba(${props.color}, 1)` : `rgb(${props.color}, 0.8)`,
    borderLeftColor: props.variant !== 'shadow' ? `rgba(${props.color}, 0.3)` : `rgb(${props.color}, 0.8)`,
  }),
});

const Cell = (props) => {
  const { type, variant } = props;
  const style = {
    type,
    color: TETROMINOS[type].color,
    variant,
  };
  const classes = useCellStyles(style);

  return <Box className={classes.cell} />;
};

Cell.defaultProps = {
  type: 0,
};

Cell.propTypes = {
  type: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  variant: PropTypes.string.isRequired,
};

const CellMemo = React.memo(Cell);

const useStyles = makeStyles({
  stage: (props) => ({
    display: 'grid',
    gridTemplateRows: `repeat(
      ${props.height},
      calc(${props.size}vh / ${props.width}))`,
    gridTemplateColumns: `repeat(${props.width}, 1fr)`,
    // gridGap: '1px',
    border: '1px solid black',
    width: '100%',
    padding: props.type === 'stagePiece' ? '5px' : 0,
    // height: '100%',
    background: 'black',
  }),
});

const Stage = (props) => {
  const { stage, type } = props;

  let size = 30;
  if (type === 'stagePlayers') size = 2.5;
  if (type === 'stagePiece') size = 9;
  const style = {
    width: stage[0].length,
    height: stage.length,
    size,
    type,
  };

  const classes = useStyles(style);

  return (
    <Paper className={classes.stage}>
      {stage.map((row) => row.map((cell, x) => <CellMemo key={x} type={cell[0]} variant={cell[2]} />))}
    </Paper>
  );
};

Stage.defaultProps = {
  type: '',
};

Stage.propTypes = {
  stage: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string]))),
  ).isRequired,
  type: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default React.memo(Stage);
