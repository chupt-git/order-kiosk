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
    const type = this.props.navigation.state.params.type
    item.type = type
    return (
      <MainWrap>

        <TopNavigation/>

        <Body>
          <Text>{item.name}</Text>
          <Text>{item.price}</Text>
          <Text>{type}</Text>
          <CircleButton onPress={() => this.props.addToCart(item)}>
            <ColoredText>+</ColoredText>
          </CircleButton>
        </Body>
        <BottomNavigation/>
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
