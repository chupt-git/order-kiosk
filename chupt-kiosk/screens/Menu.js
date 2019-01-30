import React from 'react';
import { View, Button, Text, Image, TouchableOpacity  } from 'react-native';
// import { Appbar, Button, Text, Headline } from 'react-native-paper';
import MainWrap from '../components/MainWrap';
import styled from 'styled-components/native'
// import MainButton from '../components/MainButton';
import ButtonText from '../components/ButtonText';


class Menu extends React.Component {
  render() {
    return (
      <MainWrap>
        <View>
          <Text>STEPPER GOES HERE</Text>
          <Text>
            Meal: <GreenText>6.50</GreenText> -  Entree: <GreenText>3.50</GreenText> - Side: <GreenText>2.50</GreenText> - Drink: <GreenText>1.00</GreenText>
          </Text>
        </View>

      </MainWrap>
    );
  }
}

const Header = styled.View`
  display: flex;

`

const GreenText = styled.Text`
  color: green;

`

// <MainButton onPress={() => this.props.navigation.navigate('Checkout')}>
//   <Image source={require('../assets/arrow.png')}/>
//   <ButtonText>CheCKK</ButtonText>
// </MainButton>

export default Menu;
