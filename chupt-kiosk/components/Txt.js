import styled from 'styled-components/native'

const Txt = styled.Text`
  color: ${props => props.light ? '#919191' : props.blue ? '#0079cc' : '#000'}
  font-weight: ${props => props.bold ? 'bold' : props.med ? '500' :  'normal'}
  font-size: ${props => props.bold ? 20 : 15};
`

export default Txt;
