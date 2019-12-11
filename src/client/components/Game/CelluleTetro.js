import React from 'react';
import PropTypes from 'prop-types';
import StyledCellTetro from './StyledCellTetro';
import { TETROMINOS } from './tetrominos';

const CellTetro = ({ type }) => (
  <StyledCellTetro type={type} color={TETROMINOS[type].color} />
);

CellTetro.propTypes = {
  type: PropTypes.number.isRequired,
};

export default React.memo(CellTetro);
