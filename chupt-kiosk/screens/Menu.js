import React from 'react'
import { View, FlatList } from 'react-native'
import { connect } from 'react-redux'
import MainWrap from '../components/MainWrap'
import ButtonText from '../components/ButtonText'
import MainButton from '../components/MainButton'
import Body from '../components/Body'
import TopNavigation from './TopNavigation'
import BottomNavigation from './BottomNavigation'
import MenuItem from './MenuItem'
import ColoredText from '../components/ColoredText'


class Menu extends React.Component {
  render() {
    const menu = this.props.navigation.state.params
    const items = this.props.menu.products
    let currentProducts = []

    Object.keys(items).forEach(function(key) {
      if (key === menu.type) {
        currentProducts = items[key]
    }})
    return (
      <MainWrap>
        <TopNavigation/>
        <Body>
          <MainButton type={menu.type} medWidth
          style={{
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'row',
            alignItems:'flex-end'}}>
            <ButtonText small>{menu.type}</ButtonText>
            <View style={{
              height: 50,
              display: 'flex',
              flexDirection: 'row',
              alignItems:'flex-end'}}>
              <ButtonText small>${menu.price.front}</ButtonText>
              <ColoredText style={{
                    fontSize:25,
                    lineHeight: 25,
                    alignSelf: 'flex-start'}}>
                    .{menu.price.back}
              </ColoredText>
            </View>
          </MainButton>
          <FlatList
            contentContainerStyle={{flexGrow: 1}}
            style={{width: '95%'}}
            data={currentProducts}
            renderItem={({item}) => {
              return (
                <MenuItem
                  item={item}
                  type={menu.type}
                />
              )}}
            keyExtractor={(item, index) => index.toString()}
          />
        <BottomNavigation/>
        </Body>
      </MainWrap>
    )
  }
}

function mapStateToProps(state) {
    return {
        menu: state.menu
    }
}

export default connect(mapStateToProps)(Menu)
