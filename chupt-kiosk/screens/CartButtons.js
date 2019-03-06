import React from 'react'
import { View, TextInput } from 'react-native'
import {CircleButton } from '../components/CircleButton'
import ColoredText from '../components/ColoredText'
import { bindActionCreators } from 'redux'
import { removeFromCart, addToCart, changeItemNumber } from '../kioskActions'
import { connect } from 'react-redux'


class CartButtons extends React.Component {
  render() {
    const item = this.props.item.item
    return (
    <View style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
    }}>

      <TextInput
        maxLength={2}
        keyboardType='numeric'
        onEndEditing={(e) => this.props.changeItemNumber(e.nativeEvent.text, item)}
        defaultValue={item.count.toString()}/>

      <CircleButton green
        onPress={() =>
          this.props.addToCart(item)
        }>
        <ColoredText>+</ColoredText>
      </CircleButton>

      <CircleButton red
        onPress={() =>
          this.props.removeFromCart(item)
        }>
        <ColoredText>X</ColoredText>
      </CircleButton>
    </View>

  )}
}


function mapStateToProps(state) {
    return {
        cart: state.cart
    }
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    removeFromCart,
    addToCart,
    changeItemNumber
  }, dispatch)
);
export default connect(mapStateToProps, mapDispatchToProps)(CartButtons)
