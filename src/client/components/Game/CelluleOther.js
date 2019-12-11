import React from 'react';
import PropTypes from 'prop-types';
import StyledCellOther from './StyledCellOther';
import { TETROMINOS } from './tetrominos';

const CellOther = ({ type }) => (
  <StyledCellOther type={type} color={TETROMINOS['L'].color} />
);

CellOther.propTypes = {
  type: PropTypes.number.isRequired,
};

export default React.memo(CellOther);
