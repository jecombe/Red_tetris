
import styled from 'styled-components';


const StyledOtherStage = styled.div`
display: grid;
grid-template-rows: repeat(
  ${(props) => props.height},
  calc(12vw / ${(props) => props.width})
);
grid-template-columns: repeat(${(props) => props.width}, 1fr);
grid-gap: 1px;
border: 4px solid red;
width: 100%;
max-width: 12vw;
background: #111;
`;

export default StyledOtherStage;
