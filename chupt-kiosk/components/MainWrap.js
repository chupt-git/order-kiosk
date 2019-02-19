import styled from 'styled-components/native'
import { Dimensions } from 'react-native'

const MainWrap = styled.View`
  background-color: ${props => props.home ? "#27CC33" : "#fff"};
  display: flex;
  justify-content: ${props => props.home ? "space-around" : "space-between"};
  align-items: center;
  height: 100%
`;

export default MainWrap;
