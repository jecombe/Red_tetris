import styled from 'styled-components';

export const StyledDisplayGameOver = styled.div`
box-sizing: border-box;
display: flex;
align-items: center; 
margin: 0 0 50px 0;
padding: 20px;
border: 4px solid red;
min-height: 30px;
width: 100%;
border-radius: 20px;
color: ${(props) => (props.gameOver ? 'red' : 'red')};
background: #000;
font-family: Pixel, Arial, Helvetica, sans-serif;
font-size: 1rem;
    animation: Test 1s infinite;

@keyframes Test{
    0%{opacity: 1;}
    50%{opacity: 0;}
    100%{opacity: 1;}
}
`;
