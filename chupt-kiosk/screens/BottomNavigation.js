import React from 'react'
import { LinearGradient } from 'expo'
import MainButton from '../components/MainButton'
import Cart from './Cart'
import ColoredText from '../components/ColoredText'
import CircleButton from '../components/CircleButton'

import { View } from 'react-native'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import {bindActionCreators} from "redux";
import {toggleModalDisplay} from "../kioskActions";

class BottomNavigation extends React.Component {
  render() {
    let populated = true

    for (let x of this.props.cart) {
      if (x.items.length) {
        populated = false
        break;
      }
      else {
        populated = true
      }
    }
    return (
        <View style={{width: '100%'}}>
        <View style={{height: 30,width: '100%', backgroundColor: '#efeded'}}/>
          <View style={{
            height: 90,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            backgroundColor:'#e8e8e8'}}>
              <View
                  style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '95%',
                      position: 'relative',
                      zIndex: 2}}>
                  <CircleButton
                      disabled={populated}
                      onPress={() =>
                          this.props.toggleModalDisplay()
                      }>
                      <ColoredText  disabled={populated}>X</ColoredText>
                  </CircleButton>
                  <View
                      style={{
                          display: 'flex',
                          flexDirection: 'row'}}>
                      <MainButton
                          noBorder
                          smallWidth
                          disabled={populated}
                          onPress={() => this.props.navigation.navigate('Cart')}>
                          <ColoredText  disabled={populated}>Cart</ColoredText>
                      </MainButton>
                      <MainButton
                          style={{marginRight: 10, marginLeft: 10,}}
                          noBorder
                          smallWidth
                          disabled={populated}
                          onPress={() => this.props.navigation.navigate('Finish')}>
                          <ColoredText disabled={populated}>Checkout</ColoredText>
                      </MainButton>
                  </View>
              </View>
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