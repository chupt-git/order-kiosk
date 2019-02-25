import React from 'react'
import { View, Text, Image, TouchableOpacity, } from 'react-native'
import styled from 'styled-components/native'
import MainWrap from '../components/MainWrap'
import TopNavigation from './TopNavigation'
import BottomNavigation from './BottomNavigation'
import Body from '../components/Body'
import CircleButton from '../components/CircleButton'
import ColoredText from '../components/ColoredText'
import { addToCart } from '../kioskActions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


class ModifyItem extends React.Component {
  constructor() {
    super();
  }

  render() {
    const item = this.props.navigation.state.params.item
    return (
      <MainWrap>

        <TopNavigation/>

        <Body>
          <Text>{item.name}{item.type}{item.price}</Text>
          <CircleButton onPress={() => this.props.addToCart(item)}>
            <ColoredText>+</ColoredText>
          </CircleButton>
          <BottomNavigation/>
        </Body>
      </MainWrap>
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

export default connect(mapStateToProps, mapDispatchToProps) (ModifyItem)
