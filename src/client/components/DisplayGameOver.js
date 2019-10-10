import React from 'react';
import { StyledDisplayGameOver } from './styles/StyledDisplayGameOver';

const Display = ({ gameOver, text }) => (
  <StyledDisplayGameOver>{text}</StyledDisplayGameOver>
);

export default Display;
