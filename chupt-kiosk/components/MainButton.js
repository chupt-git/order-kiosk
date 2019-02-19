import styled from 'styled-components/native'

const MainButton = styled.TouchableOpacity`
  width: ${props => props.fullWidth ? "100%" : props.medWidth ? "95%" : "50%"};
  padding-top: 15;
  padding-bottom: 15;
  padding-left: 50;
  padding-right: 50;
  border-radius: 50;
  /* margin-bottom: 100; */
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  /* elevation: 25; */
  border: 2px solid #ffffff;
  background-color: ${props => props.green ? "#6BE545" : props.blue ? "#3993F3" : props.pink ? "#EF7A6B" : props.lightBlue ? '#96cdfd' : props.white ? "#fff" : "#353636"};
`;

export default MainButton;
