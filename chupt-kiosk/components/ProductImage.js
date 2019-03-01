import styled from 'styled-components/native'

const ProductImage = styled.Image`
  resizeMode: contain;
  position: absolute;
  width: ${props => props.number == '1' ? "200" : "250"};
  height: ${props => props.number == '1' ? "200" : "250"};
  z-index: ${props => props.number == '1' ? "0" : "1"};
  border-radius: 300;
`

export default ProductImage
