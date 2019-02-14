import styled from 'styled-components/native'

const MainWrap = styled.View`
  background-color: ${props => props.home ? "#D2D3D3" : "#fff"};
  height: 100%;
  display: flex;
  justify-content: space-around;

`;

export default MainWrap;
