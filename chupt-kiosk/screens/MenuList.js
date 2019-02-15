import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import MainWrap from '../components/MainWrap';
import MenuItem from './MenuItem';
import PropTypes from 'prop-types';
import Cart from './Cart';
import TopNavigation from './TopNavigation'
import BottomNavigation from './BottomNavigation'


class MenuList extends React.Component {
  constructor() {
    super();
  }

  render() {
    console.log(this.props.type);
    return (
      <Text>
        {this.props.type}
      </Text>
    );
  }
}

// <FlatList
// data={types}
// renderItem={({type}) => {
// return (
//   <MenuList
//   type={type}
//   />
// )}}
// />

// <FlatList
//   style={{flex:1}}
//   data={menu}
//   renderItem={({item}) => {
//   return (
//     <MenuItem
//       item={item}
//     />
//   )}}
//   keyExtractor={(item, index) => index.toString()}
//   />


export default MenuList;
