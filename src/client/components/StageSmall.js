import React from 'react';
import Cell from './Cellule';
import { StyledStageSmall } from './styles/StyledStageSmall';
import { StyledDisplaySmall } from './styles/StyledDisplaySmall';

const StageSmall = ({ stage, text }) => (

  <StyledStageSmall width={stage[0].length} height={stage.length} text={stage.text}>

    {stage.map((row) => row.map((cell, x) => <Cell key={x} type={cell[0]} />))}
  </StyledStageSmall>
);

export default StageSmall;
