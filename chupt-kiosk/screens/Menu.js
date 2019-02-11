import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import ButtonText from '../components/ButtonText';
import HeaderText from '../components/HeaderText';
import GreenText from '../components/GreenText';
import MainWrap from '../components/MainWrap';
import MenuItem from './MenuItem';
import PropTypes from 'prop-types';
import Cart from './Cart'
class Menu extends React.Component {

  constructor() {
    super();
    this.viewabilityConfig = {itemVisiblePercentThreshold: 50};
    this.state = {
      currentPosition: 1,
    }
  }

  render() {
    const menu = this.props.navigation.state.params.menuList.products;
    let deviceWidth = Dimensions.get('window').width

    return (
      <MainWrap>
        <View>
          <Text>
            Meal: <GreenText>6.50</GreenText>
            -  Entree: <GreenText>3.50</GreenText>
            - Side: <GreenText>2.50</GreenText>
            - Drink: <GreenText>1.00</GreenText>
          </Text>
        </View>

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

        <TouchableOpacity onPress={() => this.props.navigation.navigate('Checkout')}>
          <Image
            resizeMode={'contain'}
            style={{ height: 50, width: 50}}
            source={require('../assets/arrow_left.png')}/>
        </TouchableOpacity>
      </MainWrap>
    );
  }
}


export default Menu;
