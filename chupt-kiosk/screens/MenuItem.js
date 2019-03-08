import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import CircleButton from '../components/CircleButton'
import ColoredText from '../components/ColoredText'
import MenuItemWrap from '../components/MenuItemWrap'
import ItemTitle from '../components/ItemTitle'
import MenuImage from './MenuImage.js'
import { addToCart, changeSide } from '../kioskActions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'

class MenuItem extends React.Component {
  render() {
    const item = this.props.item
    item.type = this.props.type
    const addButton = []
    if(!this.props.addSides) {
        addButton.push(<CircleButton
            key={'addButton'}
            onPress={() => {
                this.props.addToCart(item)
                this.props.navigation.navigate('MenuPicker')}}>
            <ColoredText>+</ColoredText>
        </CircleButton>)
    } else {
        addButton.push(<CircleButton
            key={'addButton'}
            onPress={() => {
                this.props.changeSide(item)
                this.props.navigation.goBack()}}>
            <ColoredText>+</ColoredText>
        </CircleButton>)
    }
    return (
      <View style={{position: 'relative'}}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('ModifyItem', {
            item: item
          })}
          style={{
            position: 'absolute',
            top: 20,
            right: 25,
            zIndex: 1
          }}>
            <Text style={{fontSize: 30}}>...</Text>
          </TouchableOpacity>
          <MenuItemWrap style={{
            flexDirection: 'row',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            paddingTop: 50,
            minHeight: 300}}>
            <MenuImage style={{width: '50%'}} item={item}/>
            <View style={{width: '50%'}}>
              <ItemTitle>{item.name}</ItemTitle>
              <Text>{item.description}</Text>
            </View>
          </MenuItemWrap>
          <View>
          </View>
          <View
            style={{
              position: 'absolute',
              bottom: -5,
              display:'flex',
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'center'
            }}>

              {addButton}
          </View>
        </View>
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
        changeSide
    }, dispatch)
)


export default withNavigation(connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuItem))
