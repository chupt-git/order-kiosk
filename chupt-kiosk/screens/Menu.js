import React from 'react'
import { View, Text, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native'
import styled from 'styled-components/native'
import MainWrap from '../components/MainWrap'
import ProductType from '../components/ProductType'
import ButtonText from '../components/ButtonText'
import MenuItem from './MenuItem'
import MenuList from './MenuList'
import PropTypes from 'prop-types'
import Cart from './Cart'
import TopNavigation from './TopNavigation'
import BottomNavigation from './BottomNavigation'
import { LinearGradient } from 'expo';


class Menu extends React.Component {
  constructor() {
    super();
  }

  render() {
    const menu = this.props.navigation.state.params.menu.products
    const test = []

    Object.keys(menu).forEach(function(key) {
      const type = menu[key]
      const price = type[0].price
      test.push([key, price])
    });

    return (
      <MainWrap>

        <TopNavigation/>

        <FlatList
          data={test}
          renderItem={({item}) => {
            return (
              <View>
                <LinearGradient
                  start={{x: 0, y: 0.1}}
                  end={{x: 1, y: 0}}
                  colors={['#27CC33', '#078611']}
                  style={{
                    height: 250,
                    width: "80%",
                    marginBottom: 20,
                    marginTop: 20,
                    marginLeft: "auto",
                    marginRight: "auto"}}>
                  <ButtonText>{item[0]}</ButtonText>
                  <ButtonText>{item[1]}</ButtonText>
                </LinearGradient>
              </View>
            )}}
          keyExtractor={(item, index) => index.toString()}
        />

        <BottomNavigation/>

      </MainWrap>
    );
  }
}

export default Menu;



// <TouchableOpacity onPress={() => this.props.navigation.navigate('Checkout')}>
//   <Image
//     resizeMode={'contain'}
//     style={{ height: 50, width: 50}}
//     source={require('../assets/arrow_left.png')}/>
// </TouchableOpacity>
