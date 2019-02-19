import React from 'react'
import { Text, View, TouchableWithoutFeedback, Image } from 'react-native'
import styled from 'styled-components/native'
import CircleButton from '../components/CircleButton'
import ColoredText from '../components/ColoredText'
import MenuItemWrap from '../components/MenuItemWrap'
import ItemTitle from '../components/ItemTitle'
import { addToCart } from '../kioskActions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'

class MenuItem extends React.Component {
  render() {
    const item = this.props.item
    let name = []
    let desc = []
    if (item.type == 'entree + side') {
      item.items.forEach(function(x) {
        if (item.items[0].name == x.name){
          name.push(x.name)
          desc.push(x.description)
        }
        name.push(' + ' + x.name)
        desc.push(' with a ' + x.description)
      })
    }else {
      name.push(item.name)
      desc.push(item.description)
    }

    return (
      <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('ModifyItem', {
        item: item
      })}>
      <View>
          <MenuItemWrap>
            <Image
              style={{resizeMode: 'contain', width: 200, height: 200}}
              source={require('../assets/placeholder.jpg')}/>
            <View style={{width: '50%'}}>
              <ItemTitle>{name}</ItemTitle>
              <Text>{desc}</Text>
            </View>
          </MenuItemWrap>
          <CircleButton
            style={{position: 'absolute', bottom: -5, left: '50%'}}>
            <ColoredText>+</ColoredText>
          </CircleButton>
        </View>
      </TouchableWithoutFeedback>
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


export default withNavigation(connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuItem))
