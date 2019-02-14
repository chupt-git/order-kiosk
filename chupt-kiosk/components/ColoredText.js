import styled from 'styled-components/native'

const ColoredText = styled.Text`
  color: ${props => props.green ? "#27CC33" : "#fff"};
  text-align: center;
`

export default ColoredText;
