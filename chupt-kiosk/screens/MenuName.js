import React from 'react'
import { View } from 'react-native'
import MainButton from '../components/MainButton'
import ColoredText from '../components/ColoredText'
import ButtonText from '../components/ButtonText'

class MenuName extends React.Component {
  render () {
    const item = this.props.item
    return (
      <MainButton
        type={item.type}
        fullWidth
        center
        style={{
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'flex-end' }}>
        <ButtonText>{item.type}</ButtonText>

        <View style={{
          height: 80,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-end' }}>
          <ButtonText>${item.price.front}</ButtonText>
          <ColoredText style={{
            fontSize: 40,
            lineHeight: 40,
            alignSelf: 'flex-start' }}>
              .{item.price.back}
          </ColoredText>
        </View>
      </MainButton>
    )
  }
}

export default MenuName
