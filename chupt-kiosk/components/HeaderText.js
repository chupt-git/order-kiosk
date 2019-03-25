import styled from 'styled-components/native'

const HeaderText = styled.Text`
  text-align: ${props => props.left ? "left" : "center"};
  margin: ${props => props.margin ? '10px' : '0px'};
  font-weight: bold;
  font-size: ${props => props.big ? '50' : '40'};
`

export default HeaderText
