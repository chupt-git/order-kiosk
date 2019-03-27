import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import CircleButton from '../components/CircleButton'
import ColoredText from '../components/ColoredText'
import MenuItemWrap from '../components/MenuItemWrap'
import ItemTitle from '../components/ItemTitle'
import MenuImage from './MenuImage.js'
import { addToCart, changeSide, clearModdedSide, clearChecked, removePopup } from '../kioskActions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'

class MenuItem extends React.Component {
    componentDidMount() {
        if (this.props.moddedSide.length){
        this.props.clearModdedSide()
        }
        if (this.props.checked.length){
            this.props.clearChecked()
        }
    }

    render() {
    let item = this.props.item
    item.type = this.props.type
    const mealId = this.props.mealId
    const addButton = []

    if(!mealId) {
        const sideChanged = this.props.moddedSide.find(x=> x.item_id === item.item_id)
        let itemToAdd
        if (!sideChanged){
            itemToAdd = item
        }else {
            item = sideChanged
            itemToAdd = sideChanged
        }
        addButton.push (
            <View key={'addButton'} style={{display:'flex', flexDirection: 'row'}}>
                <CircleButton
                    style={{width: 150}}
                    onPress={() => {
                        this.props.addToCart(itemToAdd)
                        this.props.navigation.navigate('MenuPicker')}}>
                    <ColoredText>Add</ColoredText>
                </CircleButton>
                <CircleButton
                    style={{width: 150}}
                    onPress={() => this.props.navigation.navigate('ModifyItem', {
                        item: item
                    })}>
                    <ColoredText>Modify</ColoredText>
                </CircleButton>
            </View>
        )

    } else {
        addButton.push(
            <CircleButton
                style={{width: 100}}
                key={'addButton'}
                onPress={() => {
                    this.props.changeSide(item, mealId)
                    this.props.navigation.goBack()}}>
                <ColoredText>Choose Side</ColoredText>
            </CircleButton>)
    }

    return (
      <View style={{position: 'relative'}}>
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
        cart: state.cart,
        moddedSide: state.moddedSide,
        checked: state.checked
    }
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        addToCart,
        changeSide,
        clearModdedSide,
        clearChecked
    }, dispatch)
)


export default withNavigation(connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuItem))
