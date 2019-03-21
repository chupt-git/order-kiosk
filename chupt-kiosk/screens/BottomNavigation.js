import React from 'react'
import { LinearGradient } from 'expo'
import MainButton from '../components/MainButton'
import Cart from './Cart'
import ColoredText from '../components/ColoredText'
import CircleButton from '../components/CircleButton'
import DeleteMenuModal from './DeleteMenuModal'
import { View } from 'react-native'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import {bindActionCreators} from "redux";
import {toggleModalDisplay} from "../kioskActions";

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
        <View
          style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              position: 'relative',
              zIndex: 2}}>
                <DeleteMenuModal/>
                  <CircleButton grey onPress={() =>
                      this.props.toggleModalDisplay()
                  }>
                    <ColoredText>X</ColoredText>
                  </CircleButton>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row'}}>
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
                        onPress={() => this.props.navigation.navigate('Finish')}>
                          <ColoredText>Checkout</ColoredText>
                        </MainButton>
                  </View>
        </View>
    )}
    return (
        <View style={{width: '100%'}}>
            <View style={{height: 30,width: '100%', backgroundColor: '#efeded'}}/>
          <View style={{
            height: 90,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            backgroundColor:'#e8e8e8',}}>
          {cartButton}
          </View>
        </View>
        )
  }
}

function mapStateToProps(state) {
    return {
        cart: state.cart
    }
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        toggleModalDisplay
        // quickDeleteCart
    }, dispatch)
)

export default withNavigation(connect(
    mapStateToProps,
    mapDispatchToProps
)(BottomNavigation))

// this.props.quickDeleteCart()
// <LinearGradient
// colors={[
//         'rgba(230, 230, 230, 0)',
//     'rgba(230, 230, 230, 1)']}
// style={{
//     height: '50%',
//         width: '100%',
//         position: 'absolute',
//         bottom: 99}}>
// </LinearGradient>