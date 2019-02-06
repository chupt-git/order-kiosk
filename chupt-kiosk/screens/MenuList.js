import React from 'react';
import { View, Button, Text, Image, TouchableOpacity, ScrollView, ViewPagerAndroid, FlatList } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import styled from 'styled-components/native';
import ButtonText from '../components/ButtonText';
import HeaderText from '../components/HeaderText';
import GreenText from '../components/GreenText';
import MainWrap from '../components/MainWrap';
import MenuList from './MenuList';
import MenuItem from './MenuItem';
import PropTypes from 'prop-types';
import ItemWrap from '../components/ItemWrap';
import DescWrap from '../components/DescWrap';
import ItemTitle from '../components/ItemTitle';


const labels = ["Entree","Side","Drink"];


class Menu extends React.Component {

  constructor() {
    super();
    this.viewabilityConfig = {itemVisiblePercentThreshold: 80}
    this.state = {
      currentPage: 1
    }
  }

  render() {
    const { params } = this.props.navigation.state;

    return (
      <MainWrap>
        <View>

        <StepIndicator
         stepCount={3}
         currentPosition={this.state.currentPage}
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
          onPageSelected={(page) => {this.setState({currentPage:page.position})}}
          data={this.props.menuList}
          renderItem={({item}) => <MenuItem item={item} toggleCart={this.props.getParam('toggleCart')}/>}
          onViewableItemsChanged={this.onViewableItemsChanged}
          viewabilityConfig={this.viewabilityConfig}
          keyExtractor={(item, index) => index.toString()}
          />

        <TouchableOpacity onPress={() => this.props.navigation.navigate('Checkout')}>
          <Image resizeMode={'contain'} style={{ height: 50, width: 50}} source={require('../assets/arrow_left.png')}/>
        </TouchableOpacity>
      </MainWrap>
    );
  }
  // renderPage({ item }): React.Element<any> {
  //     return (
  //       <View style={{width: 350, height: 500, borderStyle:'solid'}}>
  //         <ItemWrap>
  //           <Img resizeMode={'cover'} source={require('../assets/placeholder.jpg')}/>
  //           <DescWrap>
  //             <ItemTitle>{this.props.item.name}</ItemTitle>
  //             <Txt light>{this.props.item.description}</Txt>
  //           </DescWrap>
  //           <OptionButtons>
  //             <CircleButton green onPress={() => console.log('Hello!')}>
  //               <MedText white>+</MedText>
  //             </CircleButton>
  //           </OptionButtons>
  //         </ItemWrap>
  //       </View>
  //
  //     );
  //   }

  onViewableItemsChanged = ({ viewableItems, changed }) => {
      const visibleItemsCount = viewableItems.length;

      const steps = {
        entree: 1,
        side: 2,
        drink: 3
      }

      let newestNum = steps[changed[0].item.type]
      console.log(newestNum);
      console.log(changed[0].item.type);
      // if(visibleItemsCount != 0) {
      this.setState({currentPage:changed[0].item.type})

      // }
    }
}


export default Menu;
