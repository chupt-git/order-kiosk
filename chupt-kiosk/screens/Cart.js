import React from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import styled from 'styled-components/native'
import CartItem from './CartItem'
import { bindActionCreators } from 'redux'
import { removeFromCart } from '../kioskActions'
import { connect } from 'react-redux'
import TopNavigation from './TopNavigation'
import Body from '../components/Body'
import MainWrap from '../components/MainWrap'

class Cart extends React.Component {
  constructor( props ) {
    super( props );
  }
  render() {
    return (
      <MainWrap>
        <TopNavigation/>
        <Body>
          <FlatList
          style={{width: '95%'}}
          data={this.props.cart}
          renderItem={(dataitem) => {
            return (
              <View style={{borderStyle:'solid', marginBottom: 5, backgroundColor: 'red'}}>
                <Text>
                  {dataitem.item.item.name}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    this.props.removeFromCart(dataitem.item)
                  }>
                  <Text>remove</Text>
                </TouchableOpacity>
              </View>
            )
          }}
          keyExtractor={(item, index) => index.toString()}
          />
        </Body>
      </MainWrap>
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
