import React from 'react'
import { Text, View, Button } from 'react-native'
import styled from 'styled-components/native'
import Img from '../components/Img'
import ItemTitle from '../components/ItemTitle'
import ItemWrap from '../components/ItemWrap'
import DescWrap from '../components/DescWrap'
import Txt from '../components/Txt'
import OptionButtons from '../components/OptionButtons'
import CircleButton from '../components/CircleButton'
import MedText from '../components/MedText'
import { bindActionCreators } from 'redux'
import { addToCart } from '../kioskActions'
import { connect } from 'react-redux'

class CartItem extends React.Component {
  render() {
    return (
      <View>
        <ItemWrap>
            <DescWrap>
              <Txt>{this.props.item.item.name}</Txt>
            </DescWrap>
        </ItemWrap>
      </View>
    );
  }
}

export default CartItem;
