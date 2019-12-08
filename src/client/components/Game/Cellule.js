import React from 'react';
import PropTypes from 'prop-types';
import StyledCell from './StyledCell';
import { TETROMINOS } from './tetrominos';

const Cell = ({ type }) => (
  <StyledCell type={type} color={TETROMINOS[type].color} />
);

Cell.propTypes = {
  type: PropTypes.number.isRequired,
};

export default React.memo(Cell);
