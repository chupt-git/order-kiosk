import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import MainWrap from '../components/MainWrap';
import MenuItem from './MenuItem';
import PropTypes from 'prop-types';
import Cart from './Cart';
import TopNavigation from './TopNavigation'
import BottomNavigation from './BottomNavigation'


class Menu extends React.Component {
  constructor() {
    super();
  }

  render() {
    const menu = this.props.navigation.state.params.menuList.products;
    let deviceWidth = Dimensions.get('window').width
    return (
      <MainWrap>

        <TopNavigation/>

        <FlatList
          style={{flex:1}}
          data={menu}
          renderItem={({item}) => {
          return (
            <MenuItem
              item={item}
            />
          )}}
          keyExtractor={(item, index) => index.toString()}
          />

        <Cart/>

        <BottomNavigation/>

      </MainWrap>
    );
  }
}


export default Menu;
//
// <TouchableOpacity onPress={() => this.props.navigation.navigate('Checkout')}>
//   <Image
//     resizeMode={'contain'}
//     style={{ height: 50, width: 50}}
//     source={require('../assets/arrow_left.png')}/>
// </TouchableOpacity>
