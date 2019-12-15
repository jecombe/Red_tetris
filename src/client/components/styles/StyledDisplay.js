import styled from 'styled-components';

export const StyledDisplay = styled.div`
box-sizing: border-box;
display: flex;
align-items: center; 
margin: 0 0 50px 0;
padding: 20px;
border: 4px solid red;
min-height: 30px;
width: 100%;
border-radius: 20px;
color: ${(props) => (props.gameOver ? 'red' : 'grey')};
background: #000;
font-family: Pixel, Arial, Helvetica, sans-serif;
font-size: 0.8rem;

`;
