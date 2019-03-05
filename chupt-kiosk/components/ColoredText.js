import styled from 'styled-components/native'

const ColoredText = styled.Text`
  color: ${props => props.green ? "#27CC33" : "#fff"};
  text-align: ${props => props.left ? "left" : "center"};
  font-size: ${props => props.bigger ? 50 : 20};
`

export default ColoredText;
