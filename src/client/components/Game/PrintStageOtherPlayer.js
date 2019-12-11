/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import CellOther from './CelluleOther';
import StyledOtherStage from './StyledOtherStage';

import { createStage } from '../../../server/stage';

let tab = [createStage()]


const PrintStageOtherPlayer = ({ stage }) => (

  
  
  stage.map(item => {
    console.log('width', item)
  

    return <StyledOtherStage width={10} height={20}>
  
    </StyledOtherStage>
  })

);

export default PrintStageOtherPlayer;
