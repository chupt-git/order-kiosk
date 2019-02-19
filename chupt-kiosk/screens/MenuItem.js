import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import CircleButton from '../components/CircleButton'
import ColoredText from '../components/ColoredText'
import { addToCart } from '../kioskActions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class MenuItem extends React.Component {
  render() {
    const item = this.props.item
    let name = []
    if (item.type == 'entree + side') {
      item.items.forEach(function(x) {
        if (item.items[0].name == x.name){
          name.push(x.name)
        }
        name.push(' + ' + x.name)
      })
    }else {
      name.push(item.name)
    }

    return (
      <View>
        <Text>{name}</Text>
        <CircleButton onPress={() => this.props.addToCart(item)}>
          <ColoredText>+</ColoredText>
        </CircleButton>
      </View>
    );
  }
}

function mapStateToProps(state) {
    return {
        cart: state.cart
    }
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    addToCart,
  }, dispatch)
)


export default connect(mapStateToProps, mapDispatchToProps)(MenuItem);
