import styled from 'styled-components/native'

const ButtonText = styled.Text`
  text-align: center;
  font-size: 50;
  color: ${props => props.green ? "#6BE545" : "#fff"  };
  padding-left: 5;
`;

export default ButtonText;
