import React from 'react'
import { View, Text, FlatList } from 'react-native'
import { LinearGradient } from 'expo'
import { connect } from 'react-redux'
import styled from 'styled-components/native'
import MainWrap from '../components/MainWrap'
import ButtonText from '../components/ButtonText'
import MainButton from '../components/MainButton'
import Body from '../components/Body'
import TopNavigation from './TopNavigation'
import BottomNavigation from './BottomNavigation'
import MenuItem from './MenuItem'


class Menu extends React.Component {

  constructor() {
    super();
  }

  render() {
    const menu = this.props.navigation.state.params
    const items = this.props.menu.products
    let currentProducts = []

    Object.keys(items).forEach(function(key) {
      if (key == menu.type) {
        currentProducts = items[key]
    }});

    return (
      <MainWrap>
        <TopNavigation/>
        <Body>
          <MainButton blue medWidth>
            <ButtonText>{menu.type}</ButtonText>
            <ButtonText>{menu.price.toFixed(2)}</ButtonText>
          </MainButton>
          <FlatList
            contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
            style={{width: '95%'}}
            data={currentProducts}
            renderItem={({item}) => {
              return (
                <MenuItem
                  item={item}
                />
              )}}
            keyExtractor={(item, index) => index.toString()}
          />
          </Body>
          <BottomNavigation/>
      </MainWrap>
    );
  }
}

function mapStateToProps(state) {
    return {
        menu: state.menu
    }
}

export default connect(mapStateToProps)(Menu);
