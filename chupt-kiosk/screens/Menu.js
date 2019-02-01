import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import styled from 'styled-components/native';
import OptionButtons from '../components/OptionButtons';
import CircleButton from '../components/CircleButton';
import ButtonText from '../components/ButtonText';
import HeaderText from '../components/HeaderText';
import GreenText from '../components/GreenText';
import ItemTitle from '../components/ItemTitle';
import ItemWrap from '../components/ItemWrap';
import MainWrap from '../components/MainWrap';
import DescWrap from '../components/DescWrap';
import MedText from '../components/MedText';
import Txt from '../components/Txt';
import Img from '../components/Img';
import MenuItem from './MenuItem';
import PropTypes from 'prop-types';
import Cart from './Cart'

const labels = ["Entree","Side","Drink"];
const customStyles = {
}


class Menu extends React.Component {

  constructor() {
    super();
    this.viewabilityConfig = {itemVisiblePercentThreshold: 50};
    this.state = {
      currentPosition: 1
    }
  }

  render() {
    const { params } = this.props.navigation.state;


    return (
      <MainWrap>
        <View>

        <StepIndicator
         customStyles={customStyles}
         stepCount={3}
         currentPosition={this.state.currentPosition}
         labels={labels}
         />

          <Text>
            Meal: <GreenText>6.50</GreenText> -  Entree: <GreenText>3.50</GreenText> - Side: <GreenText>2.50</GreenText> - Drink: <GreenText>1.00</GreenText>
          </Text>
        </View>

        <FlatList
          horizontal
          style={{flex:1}}
          ref={(viewPager) => {this.viewPager = viewPager}}
          // onPageSelected={(page) => {this.setState({currentPosition:page.position})}}
          data={params.menuList.sort()}
          renderItem={this.renderPage}
          onViewableItemsChanged={this.onViewableItemsChanged}
          viewabilityConfig={this.viewabilityConfig}
          keyExtractor={(item, index) => index.toString()}
          />

        <Cart/>

        <TouchableOpacity onPress={() => this.props.navigation.navigate('Checkout')}>
          <Image resizeMode={'contain'} style={{ height: 50, width: 50}} source={require('../assets/arrow_left.png')}/>
        </TouchableOpacity>
      </MainWrap>
    );
  }

  onViewableItemsChanged = ({ viewableItems, changed }) => {
      const visibleItemsCount = viewableItems.length;
      const steps = {
        entree: 0,
        side: 1,
        drink: 2
      }

      if (visibleItemsCount == 4) {
        const  newestNum = steps[changed[0].item.type]
        this.setState({currentPosition: newestNum})
      }

  }

  renderPage({ item }): React.Element<any> {
    return (
      <View style={{width: 350, height: 500, borderStyle:'solid'}}>
        <ItemWrap>
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
      </View>
    );
  }
}


export default Menu;
