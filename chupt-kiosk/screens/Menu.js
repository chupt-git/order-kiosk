import React from 'react';
import { View, Button, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import CircleButton from '../components/CircleButton';
import ButtonText from '../components/ButtonText';
import GreenText from '../components/GreenText';
import MainWrap from '../components/MainWrap';
import MedText from '../components/MedText';
import Txt from '../components/Txt';
import Img from '../components/Img';
import MenuItem from './MenuItem';
import PropTypes from 'prop-types'


class Menu extends React.Component {

  render() {
    const { params } = this.props.navigation.state;

    const items = params.menuList.map((item, id) =>{
      return (
        <ItemWrap key={id}>
          <Img resizeMode={'cover'} source={require('../assets/placeholder.jpg')}/>
          <DescWrap>
            <ItemTitle>{item.name}</ItemTitle>
            <Txt light>{item.description}</Txt>
          </DescWrap>
          <OptionButtons>
            <CircleButton green onPress={() => console.log('Hello!')}>
              <MedText white>+</MedText>
            </CircleButton>
          </OptionButtons>
        </ItemWrap>
      )
    })

    return (
      <MainWrap>
        <View>
          <HeaderText>STEPPER GOES HERE</HeaderText>

          <Text>
            Meal: <GreenText>6.50</GreenText> -  Entree: <GreenText>3.50</GreenText> - Side: <GreenText>2.50</GreenText> - Drink: <GreenText>1.00</GreenText>
          </Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={10}
        >
        {items}

        </ScrollView>

        <TouchableOpacity onPress={() => this.props.navigation.navigate('Checkout')}>
          <Image resizeMode={'contain'} style={{ height: 50, width: 50}} source={require('../assets/arrow_left.png')}/>
        </TouchableOpacity>
      </MainWrap>
    );
  }
}

const ItemWrap = styled.View `
  width: 300;
  display: flex;
  border-radius: 50;
  background-color: #fff;
  elevation: 5;
  margin-left: 25;
  overflow: hidden;
  justify-content: space-between;
  flex: 1;
  flex-direction: column;
`

const OptionButtons = styled.View `
  display: flex;
  flex-direction: row;
  justify-content: center
  padding-bottom: 15;
`

const Header = styled.View`
  display: flex;
`

const HeaderText = styled.Text`
  text-align: center;
  font-weight: bold;
  font-size: 40;
`

const ItemTitle = styled.Text`
  font-weight: bold;
  font-size: 30;
`

const DescWrap = styled.View`
  flex:1;
  padding-top: 15;
  padding-left: 15;
  padding-right: 15;
`





export default Menu;
