import styled from 'styled-components/native'

const MedText = styled.Text `
  color: ${props => props.white ? "#fff" : "#000"};
  font-size: 30;
`

export default MedText;
