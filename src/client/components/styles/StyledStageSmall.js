
import styled from 'styled-components';

export const StyledStageSmall = styled.div`
display: grid;
grid-template-rows: repeat(
  ${(props) => props.height},
  calc(20vw / ${(props) => props.width})
);
grid-template-columns: repeat(${(props) => props.width}, 1fr);
grid-gap: 1px;
border: 2px solid #333;
width: 100%;
max-width: 20vw;
background: #111;

margin: 0 0 50px 0;
padding: 20px;
min-height: 30px;
border-radius: 20px;
color: ${(props) => (props.gameOver ? 'red' : 'grey')};

`;
