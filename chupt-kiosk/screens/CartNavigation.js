import React from 'react'
import { LinearGradient } from 'expo'
import MainButton from '../components/MainButton'
import ColoredText from '../components/ColoredText'
import { View } from 'react-native'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'

class CartNavigation extends React.Component {
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
          alignItems: 'center',
          width: '100%',
          zIndex: 2}}>
            <MainButton
            style={{marginRight: 10, marginLeft: 10}}
            noBorder
            green
            medWidth
            centerText
            onPress={() => this.props.navigation.navigate('Checkout')}>
              <ColoredText>Checkout</ColoredText>
            </MainButton>
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
)(CartNavigation))
