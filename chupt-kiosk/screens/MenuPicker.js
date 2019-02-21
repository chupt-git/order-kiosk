import React from 'react'
import { View, Text, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native'
import styled from 'styled-components/native'
import MainWrap from '../components/MainWrap'
import ProductType from '../components/ProductType'
import ButtonText from '../components/ButtonText'
import Body from '../components/Body'
import MenuItem from './MenuItem'
import PropTypes from 'prop-types'
import Cart from './Cart'
import TopNavigation from './TopNavigation'
import BottomNavigation from './BottomNavigation'
import { LinearGradient } from 'expo'
import MainButton from '../components/MainButton'


class MenuPicker extends React.Component {
  constructor() {
    super();
  }

  render() {
    const menu = this.props.navigation.state.params.menu.products
    const types = []
    Object.keys(menu).forEach(function(key) {
     types.push({type:key, price:menu[key][0].price})
    });

    const images = {
      entrees: require('../assets/bluebg.png'),
      sides: require('../assets/redbg.png'),
      drinks: require('../assets/lightblubg.png'),
      combos: require('../assets/greenbg.png')
    }

    return (
      <MainWrap>
        <TopNavigation/>

        <Body>
          <FlatList
            contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
            style={{width: '95%'}}
            data={types}
            renderItem={({item}) => {
              return (
                  <MainButton
                    type={item.type}
                    onPress={() => this.props.navigation.navigate('Menu', {
                        type: item.type,
                        price: item.price
                    })}
                    fullWidth
                    style={{position: 'relative', overflow: 'hidden'}}>

                    <ButtonText>{item.type}</ButtonText>
                    <ButtonText>${item.price.toFixed(2)}</ButtonText>

                  </MainButton>
              )}}
            keyExtractor={(item, index) => index.toString()}
          />
        </Body>
        <BottomNavigation/>
      </MainWrap>
    );
  }
}

export default MenuPicker;

// <LinearGradient
//   start={[0,1]}
//   end={[1,0]}
//   colors={['#27CC33', '#078611']}
//   style={{
//     height: 250,
//     width: "80%",
//     marginBottom: 20,
//     marginTop: 20,
//     marginLeft: "auto",
//     marginRight: "auto",
//     }}>

// </LinearGradient>
