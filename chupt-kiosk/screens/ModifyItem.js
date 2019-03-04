import React from 'react'
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import styled from 'styled-components/native'
import MainWrap from '../components/MainWrap'
import TopNavigation from './TopNavigation'
import BottomNavigation from './BottomNavigation'
import Body from '../components/Body'
import ItemTitle from '../components/ItemTitle'
import CircleButton from '../components/CircleButton'
import ColoredText from '../components/ColoredText'
import MenuItemWrap from '../components/MenuItemWrap'
import MenuImage from './MenuImage.js'
import { addToCart } from '../kioskActions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ProductMods from './ProductMods'


class ModifyItem extends React.Component {
  constructor() {
    super();
  }

  render() {
    const item = this.props.navigation.state.params.item
    // let mods={}
    // let currentCategory = ''
    // if (item.mods) {
    // item.mods.forEach((x) => {
    //   if (currentCategory !== x.mod_type) {
    //     mods[x.mod_type] = x
    //     currentCategory = x.mod_type
    //   }})
    //   console.log(item.mods);
    // }

    return (
      <MainWrap>
        <TopNavigation/>

        <Body style={{height:'100%', justifyContent: 'space-between'}}>
          <MenuItemWrap style={{
            height:'80%',
            alignItems: 'flex-start',
            flexDirection: 'column'}}>
            <View style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start'}}>
              <MenuImage style={{width: '50%'}} item={item}/>
              <View style={{width: '50%'}}>
                <ItemTitle>{item.name}</ItemTitle>
                <Text>{item.description}</Text>
              </View>
            </View>

            <FlatList
              data={item.mods}
              renderItem={({item}) => <ProductMods item={{item}}/>}
              keyExtractor={(item, index) => index.toString()}
            />

            <View
              style={{
                position: 'absolute',
                bottom: -25,
                left: 20,
                display:'flex',
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'center',
              }}>

              <CircleButton onPress={() => {
                this.props.addToCart(item)
                this.props.navigation.navigate('MenuPicker')}}>
                <ColoredText>+</ColoredText>
              </CircleButton>
            </View>
          </MenuItemWrap>
          <BottomNavigation/>
        </Body>
      </MainWrap>
    );
  }
}

function mapStateToProps(state) {
    return {
        cart: state.cart
    }
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    addToCart,
  }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps) (ModifyItem)
