/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

import { TETROMINOS } from '../../helpers/tetrominos';

const useStyles = makeStyles(() => ({
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

export default React.memo(Cell);
