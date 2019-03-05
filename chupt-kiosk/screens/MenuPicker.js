import React from 'react'
import { View, Text, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native'
import styled from 'styled-components/native'
import MainWrap from '../components/MainWrap'
import ProductType from '../components/ProductType'
import ButtonText from '../components/ButtonText'
import Body from '../components/Body'
import ColoredText from '../components/ColoredText'
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
    Object.keys(menu).forEach((key) => {
      const a = menu[key][0].amount.toFixed(2).match(/^([^.]+)/)[0]
      const b = menu[key][0].amount.toFixed(2).match(/[^.]*$/)[0]
     types.push({type:key, price:{front: a, back:b}})
    })
    types.reverse()
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
                    center
                    style={{
                      width: '100%',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      alignItems:'flex-end'}}>

                    <ButtonText>{item.type}</ButtonText>

                    <View style={{
                      height: 80,
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems:'flex-end'}}>
                      <ButtonText>${item.price.front}</ButtonText>
                      <ColoredText style={{
                            fontSize:40,
                            lineHeight: 40,
                            alignSelf: 'flex-start'}}>
                            .{item.price.back}
                      </ColoredText>
                    </View>

                  </MainButton>
              )}}
            keyExtractor={(item, index) => index.toString()}
          />
          <BottomNavigation/>
        </Body>
      </MainWrap>
    );
  }
}

export default MenuPicker
