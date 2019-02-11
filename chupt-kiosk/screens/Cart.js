import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import styled from 'styled-components/native'

class Cart extends React.Component {

  render() {
    let cartItems = []

    // this.props.cart.forEach((dataItem) => {
    //   cartItems.push(<Text>{dataItem.name}</Text>)
    // })
    return (
      <View>
      <Text>CARTs</Text> 
      </View>
    )
  }

}

export default Cart;
