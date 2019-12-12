/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import CellOther from './CelluleOther';
import StyledOtherStage from './StyledOtherStage';

import { createStage } from '../../../server/stage';

//let tab = [createStage(), createStage()]

//console.log('TAB ===+> ', tab)
const PrintStageOtherPlayer = ({ stage }) => (

  
  stage.map(item => {
    
    return <StyledOtherStage width={10} height={20}>
  {item.map((row) => row.map((cell, x) => <CellOther key={x} type={cell[0]} />))}
    </StyledOtherStage>
  })

);

export default PrintStageOtherPlayer;
