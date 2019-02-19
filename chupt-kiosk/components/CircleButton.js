import styled from 'styled-components/native'

const CircleButton = styled.TouchableOpacity `
  border-radius: 50;
  background-color: ${props => props.green ? "#6BE545" : props.red ? "#EB3223" : props.darkBlue ? "#0079cc" : "#3B93EF"};
  height: 50;
  width: 50;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
`

export default CircleButton
