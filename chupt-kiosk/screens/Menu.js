import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import StepIndicator from 'react-native-step-indicator';
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
    const { params } = this.props.navigation.state;
    let deviceWidth = Dimensions.get('window').width

    cartItems = []

    params.cart.forEach((dataItem) => {
      cartItems.push(<Text>{dataItem.name}</Text>)
    })

    console.log(params.cart);
    return (
      <MainWrap>
        <View>
          <Text>Stepper Indicator Goes here</Text>
          <Text>
            Meal: <GreenText>6.50</GreenText>
            -  Entree: <GreenText>3.50</GreenText>
            - Side: <GreenText>2.50</GreenText>
            - Drink: <GreenText>1.00</GreenText>
          </Text>
        </View>

        <Carousel
          loop
          horizontal
          loopClonesPerSide={50}
          style={{flex:1}}
          showsHorizontalScrollIndicator={false}
          ref={(c) => { this._carousel = c; }}
          data={params.menuList.sort()}
          renderItem={({item}) => {
          return (
            <MenuItem
              item={item}
              toggleCart={params.toggleCart}
            />
          )}}
          sliderWidth={deviceWidth}
          itemWidth={350}
          inactiveSlideScale={1}
          inactiveSlideOpacity={1}
          keyExtractor={(item, index) => index.toString()}
          />

          <Text>{cartItems}</Text>

        <Cart cart={params.cart}/>

        <TouchableOpacity onPress={() => this.props.navigation.navigate('Checkout')}>
          <Image
            resizeMode={'contain'}
            style={{ height: 50, width: 50}}
            source={require('../assets/arrow_left.png')}/>
        </TouchableOpacity>
      </MainWrap>
    );
  }

  // renderPage(parentData, { item }): React.Element<any> {
  //   return (
  //     <View style={{width: 350, height: 500, borderStyle:'solid'}}>
  //       <ItemWrap>
  //         <Img resizeMode={'cover'} source={require('../assets/placeholder.jpg')}/>
  //         <DescWrap>
  //           <ItemTitle>{item.name}</ItemTitle>
  //           <Txt light>{item.description}</Txt>
  //         </DescWrap>
  //         <OptionButtons>
  //           <CircleButton green onPress={params.toggleCart}>
  //             <MedText white>+</MedText>
  //           </CircleButton>
  //         </OptionButtons>
  //       </ItemWrap>
  //     </View>
  //   );
  // }
}


export default Menu;
