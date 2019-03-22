import styled from 'styled-components/native'

export const CircleButton = styled.TouchableOpacity `
  border-radius: 50;
  background-color: ${props => props.disabled === true ? '#ddd' : props.green ? "#6BE545" : props.red  || props.disabled === false ? "#EB3223" : props.darkBlue ? "#0079cc" : props.grey ? "#747474" : "#3B93EF"};
  height: ${props => props.bigger ? 65 : 50};
  width: ${props => props.bigger ? 65 : 50};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${props => props.noMargin ? '0' : '10px'};
  margin-bottom: ${props => props.lower ? '-10px' : props.noMargin ? '0' : '10px'};
`

export const DeleteButton = styled(CircleButton) `
  height: 30;
  width: 30;
  position: absolute;
  top: -25;
  right: -30;
`;

export default CircleButton
