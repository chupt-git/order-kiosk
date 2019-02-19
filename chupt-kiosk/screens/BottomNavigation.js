import React from 'react'
import HeaderHat from '../components/HeaderHat'
import HatWrapper from '../components/HatWrapper'
import { LinearGradient } from 'expo'
import LogoImg from '../components/LogoImg'
import Cart from './Cart'
import ColoredText from '../components/ColoredText'
import { TouchableOpacity, Text } from 'react-native'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'

class BottomNavigation extends React.Component {
  render() {
    let cartButton
    if (this.props.cart.length) {
      cartButton = (<TouchableOpacity
        onPress={() => this.props.navigation.navigate('Cart')}>
        <Text>Cart</Text>
      </TouchableOpacity>
    )}
    return (
      <HatWrapper bottomHat>
        <HeaderHat>
        </HeaderHat>

        <LinearGradient
          colors={['#4284C5', '#3993F3', '#3993F3']}
          style={{ height: "70%", width: "80%", position: 'relative' }}>
          {cartButton}
        </LinearGradient>

      </HatWrapper>
    );
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
