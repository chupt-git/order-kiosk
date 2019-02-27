import React from 'react'
import { View, Text, TouchableOpacity, FlatList, SectionList } from 'react-native'
import styled from 'styled-components/native'
import CartItem from './CartItem'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import TopNavigation from './TopNavigation'
import Body from '../components/Body'
import Txt from '../components/Txt'
import MainWrap from '../components/MainWrap'
import MedText from '../components/MedText'
import CircleButton from '../components/CircleButton'
import CartNavigation from './CartNavigation'

class Cart extends React.Component {
  constructor( props ) {
    super( props )
  }
  render() {
    return (
      <MainWrap>
        <TopNavigation/>
        <Body>
          <View
            style={{
              backgroundColor: '#F7F7F7',
              width: '95%',
              borderRadius: 15,
              flex: 1,
              margin: 20,
              padding: 20

            }}>
            <MedText>Cart</MedText>
            <FlatList
            style={{width: '100%', padding: 20}}
            data={this.props.cart}
            renderItem={(dataItem) => {
              return (
                <CartItem
                  item={dataItem}/>
              )
            }}
            keyExtractor={(item, index) => index.toString()}
            />
          </View>
          <CartNavigation/>
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

export default connect(mapStateToProps)(Cart)
