import React from 'react'
import { Text, View, Button, FlatList } from 'react-native'
import styled from 'styled-components/native'
import Img from '../components/Img'
import ItemTitle from '../components/ItemTitle'
import ItemWrap from '../components/ItemWrap'
import DescWrap from '../components/DescWrap'
import Txt from '../components/Txt'
import OptionButtons from '../components/OptionButtons'
import CircleButton from '../components/CircleButton'
import ColoredText from '../components/ColoredText'
import MedText from '../components/MedText'
import { bindActionCreators } from 'redux'
import { removeFromCart, addToCart } from '../kioskActions'
import { connect } from 'react-redux'

class CartItem extends React.Component {
  render() {
    let header = ''
    if (this.props.item.item.items.length) {
      header = <Txt bold blue style={{marginBottom: 10}}>{this.props.item.item.type.toUpperCase()}:</Txt>
    }
    return (
      <View>
        <Text>{header}</Text>
        <FlatList
          style={{width: '95%', padding: 20}}
          data={this.props.item.item.items}
          renderItem={(dataItem) => {
            return (
              <View>
                <View style={{
                  marginBottom: 5,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between'}}>
                  <Txt light>
                    {dataItem.item.name} {dataItem.item.count}
                  </Txt>
                  <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'}}>
                    <CircleButton red
                      onPress={() =>
                        this.props.removeFromCart(dataItem.item)
                      }>
                      <ColoredText>X</ColoredText>
                    </CircleButton>

                    <CircleButton green
                      onPress={() =>
                        this.props.addToCart(dataItem.item)
                      }>
                      <ColoredText>+</ColoredText>
                    </CircleButton>
                  </View>
                </View>
              </View>
            )
          }}
          keyExtractor={(item, index) => index.toString()}
        />
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
    removeFromCart,
    addToCart,
  }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
