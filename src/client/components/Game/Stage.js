/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import Cell from './Cellule';
import StyledStage from './StyledStage';

const Stage = ({ stage }) => (
  <StyledStage width={stage[0].length} height={stage.length}>

    {stage.map((row) => row.map((cell, x) => <Cell key={x} type={cell[0]}  />))}
  </StyledStage>
);

Stage.propTypes = {
  stage: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Stage;
