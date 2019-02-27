import React from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
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
    item.type = this.props.type

    return (
      <View style={{position: 'relative'}}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('ModifyItem', {
            item: item,
            type: this.props.type
          })}
          style={{
            position: 'absolute',
            top: 20,
            right: 25,
            zIndex: 1
          }}>
            <Text style={{fontSize: 30}}>...</Text>
          </TouchableOpacity>


          <MenuItemWrap>
            <Image
              style={{resizeMode: 'contain', width: 200, height: 200}}
              source={require('../assets/placeholder.jpg')}/>
            <View style={{width: '50%'}}>
              <ItemTitle>{item.name}</ItemTitle>
              <Text>{item.description}</Text>
            </View>
          </MenuItemWrap>

          <View
            style={{
              position: 'absolute',
              bottom: -5,
              display:'flex',
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'center'
            }}>

            <CircleButton onPress={() => {
              this.props.addToCart(item) 
              this.props.navigation.navigate('MenuPicker')}}>
              <ColoredText>+</ColoredText>
            </CircleButton>
          </View>
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


export default withNavigation(connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuItem))
