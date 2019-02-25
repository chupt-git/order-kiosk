import React from 'react'
import HeaderHat from '../components/HeaderHat'
import HatWrapper from '../components/HatWrapper'
import { LinearGradient } from 'expo'
import LogoImg from '../components/LogoImg'
import MainButton from '../components/MainButton'
import Cart from './Cart'
import ColoredText from '../components/ColoredText'
import CircleButton from '../components/CircleButton'
import { TouchableOpacity, Text, View } from 'react-native'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'

class BottomNavigation extends React.Component {
  render() {
    let cartButton
    let populated = false

    for (let x of this.props.cart) {
      if (x.items.length) {
        populated = true
        break;
      }
      else {
        populated = false
      }
    }
    if (populated) {
      cartButton = (
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          position: 'relative',
          zIndex: 2}}>
          <CircleButton grey>
            <ColoredText>X</ColoredText>
          </CircleButton>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row'}}
            >
            <MainButton
            noBorder
            green
            smallWidth
            onPress={() => this.props.navigation.navigate('Cart')}>
              <ColoredText>Cart</ColoredText>
            </MainButton>
            <MainButton
            style={{marginRight: 10, marginLeft: 10,}}
            noBorder
            green
            smallWidth
            onPress={() => this.props.navigation.navigate('Checkout')}>
              <ColoredText>Checkout</ColoredText>
            </MainButton>
          </View>
      </View>
    )}
    return (
      <View style={{
        height: 100,
        width: '100%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center'}}>
      <LinearGradient
        colors={[
          'rgba(230, 230, 230, 0)',
          'rgba(230, 230, 230, 1)']}
        style={{
          height: '50%',
          width: '100%',
          position: 'absolute',
          bottom: 99}}>
      </LinearGradient>
      {cartButton}
      </View>
    )
  }
}

function mapStateToProps(state) {
    return {
        cart: state.cart
    }
}

export default withNavigation(connect(
  mapStateToProps
)(BottomNavigation))
