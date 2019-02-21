import styled from 'styled-components/native'

const MainButton = styled.TouchableOpacity`
  width: ${props => props.fullWidth ? "100%" : props.medWidth ? "95%" : props.smallWidth ? "auto" : "50%"};
  padding-top: 15;
  padding-bottom: 15;
  padding-left: 50;
  padding-right: 50;
  border-radius: 50;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  /* elevation: 25; */
  border: ${props => props.noBorder ? "0" : "2px solid #ffffff"};
  margin-bottom: 20px;
  margin-top: 20px;

  background-color: ${props => props.green || props.type == 'combos' ? "#6BE545" : props.blue || props.type == 'entrees' ? "#3993F3" : props.pink || props.type == 'sides' ? "#EF7A6B" : props.lightBlue || props.type == 'drinks' ? '#96cdfd' : props.white ? "#fff" : "transparent"};
`;

export default MainButton;
