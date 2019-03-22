import styled from 'styled-components/native'

const ColoredText = styled.Text`
  color: ${props => props.green ? "#27CC33" : props.disabled === true ? '#e8e8e8' : "#fff"};
  text-align: ${props => props.left ? "left" : "center"};
  font-size: ${props => props.bigger ? 50 : 20};
`

export default ColoredText;
