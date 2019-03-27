import styled from 'styled-components/native'

const HeaderText = styled.Text`
  text-align: ${props => props.left ? 'left' : 'center'};
  margin: ${props => props.margin ? '10px' : '0px'};
  font-weight: ${props => props.light ? 'normal' : 'bold'};
  font-size: ${props => props.big ? '50' : '40'};
  color: ${props=> props.white ? '#fff' : '#000'};
`

export default HeaderText
