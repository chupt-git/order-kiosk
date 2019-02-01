import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import styled from 'styled-components/native'

class Cart extends React.Component {

  render() {
    return (
      <View>
        <FlatList
          data={this.props.cart}
          renderItem={this.renderPage}
        />
        <Text>Total: </Text>
      </View>
    )
  }

}

export default Cart;
