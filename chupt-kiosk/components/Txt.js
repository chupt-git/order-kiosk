import styled from 'styled-components/native'

const Txt = styled.Text`
  color: ${props => props.light ? '#919191' : '#000'}
  font-weight: ${props => props.bold ? 'bold' : props.med ? '500' :  'normal'}
  font-size: 20;
`

export default Txt;
