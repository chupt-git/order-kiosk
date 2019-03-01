import React from 'react'
import { View, Text, Image, TouchableOpacity, } from 'react-native'
import styled from 'styled-components/native'
import MainWrap from '../components/MainWrap'
import TopNavigation from './TopNavigation'
import BottomNavigation from './BottomNavigation'
import Body from '../components/Body'
import CircleButton from '../components/CircleButton'
import ColoredText from '../components/ColoredText'
import MenuItemWrap from '../components/MenuItemWrap'
import MenuImage from './MenuImage.js'
import ItemTitle from '../components/ItemTitle'
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
          <MenuItemWrap style={{
            flexDirection: 'row',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            paddingTop: 50,
            minHeight: 300}}>
            <MenuImage style={{width: '50%'}} item={item}/>
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
