import styled from 'styled-components/native'

const HatWrapper = styled.View`
  height: ${props => props.bottomHat ? "100px" : "150px"};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

`;

export default HatWrapper;
