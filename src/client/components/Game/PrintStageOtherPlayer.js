/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import CellOther from './CelluleOther';
import StyledOtherStage from './StyledOtherStage';

import { createStage } from '../../../server/stage';

let tab = [createStage() ]

 
const PrintStageOtherPlayer = () => (

    tab.map(item => {
        console.log('width', item[0].length, 'height ', item.length)

       return  <StyledOtherStage width={item[0].length} height={item.length}>
        {item.map((row) => row.map((cell, x) => <CellOther key={x} type={cell[0]} />))}
      </StyledOtherStage>
    })
 
  );

export default PrintStageOtherPlayer;
