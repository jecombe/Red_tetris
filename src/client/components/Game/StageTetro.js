/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import CellTetro from './CelluleTetro';
import StyledStageTetro from './StyledStageTetro';

const StageTetro = ({ stage }) => (
  <StyledStageTetro width={stage[0].length} height={stage.length}>
    {stage.map((row) => row.map((cell, x) => <CellTetro key={x} type={cell[0]} />))}
  </StyledStageTetro>
);

StageTetro.propTypes = {
  stage: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default StageTetro;
