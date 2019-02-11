import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import styled from 'styled-components/native'
import CartItem from './CartItem';
import { bindActionCreators } from 'redux';
import { removeFromCart } from '../kioskActions';
import { connect } from 'react-redux';

class Cart extends React.Component {
  constructor( props ) {
    super( props );
  }
  render() {
    if (!this.props.cart) {
      return null
    }
    return (
      <View>
      <Text>CART</Text>
      <FlatList
      data={this.props.cart}
      renderItem={(dataitem) => {
        return (
          <View>
            <Text>
              {dataitem.item.item.name}
            </Text>
            <TouchableOpacity
              onPress={() =>
                this.props.removeFromCart(dataitem.item.item)
              }>
              <Text>remove</Text>
            </TouchableOpacity>
          </View>
        )
      }}
      keyExtractor={(item, index) => index.toString()}
      />
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
    removeFromCart,
  }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
