import styled from 'styled-components/native'

export const CircleButton = styled.TouchableOpacity `
  border-radius: 50;
  background-color: ${props => props.green ? "#6BE545" : props.red ? "#EB3223" : props.darkBlue ? "#0079cc" : props.grey ? "#747474" : props.disabled == true ? "red" : "#3B93EF"};
  height: 50;
  width: 50;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${props => props.noMargin ? '0' : '10px'}
  margin-bottom: ${props => props.lower ? '-10px' : props.noMargin ? '0' : '10px'}
`

export const DeleteButton = styled(CircleButton) `
  height: 30;
  width: 30;
  position: absolute;
  top: -25;
  right: -30;
`;

export default CircleButton
