import React from 'react'
import {Text, TouchableOpacity, View} from 'react-native'
import MainWrap from '../components/MainWrap'
import TopNavigation from './TopNavigation'
import BottomNavigation from './BottomNavigation'
import Body from '../components/Body'
import ItemTitle from '../components/ItemTitle'
import CircleButton from '../components/CircleButton'
import ColoredText from '../components/ColoredText'
import MenuItemWrap from '../components/MenuItemWrap'
import MenuImage from './MenuImage'
import {addToCart} from '../kioskActions'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import ModWrapper from "./ModWrapper"
import MainButton from '../components/MainButton'
import {withNavigation} from "react-navigation"
import MedText from "../components/MedText"
import Txt from "../components/Txt"

class ModifyItem extends React.Component {
    render() {
        const menuItem = this.props.navigation.state.params.item
        let itemWrap
        const sideChanged = this.props.moddedSide.find(x => x.item_id === menuItem.item_id)

        if (!sideChanged) {
            itemWrap = menuItem
        } else {
            itemWrap = sideChanged
        }

        const mods = []
        const sideButton = []
        if (!itemWrap.items) {
            mods.push(
                <ModWrapper
                    key={itemWrap.item_id}
                    item={{item: itemWrap}}
                    mealType={'single'}
                    productID={itemWrap.item_id}/>)
        } else {
            //Multi items
            itemWrap.items.forEach((item) => {
                mods.push(
                    <ModWrapper
                        key={item.item_id}
                        item={{item}}
                        mealType={'multi'}
                        productID={itemWrap.item_id}/>)
            })
            sideButton.push(
                <MainButton
                    key={'sideButton'}
                    smallWidth
                    blueBorder
                    style={{marginLeft: 0,}}
                    onPress={() => this.props.navigation.navigate('SideChange', {
                    mealId: itemWrap.item_id
                })}>
                    <Txt blue>CHANGE SIDE</Txt>
                </MainButton>
            )
        }
        return (
            <MainWrap>
                <TopNavigation/>

                <Body style={{height: '100%', justifyContent: 'space-between'}}>
                <MenuItemWrap style={{
                    height: '80%',
                    alignItems: 'flex-start',
                    flexDirection: 'column'
                }}>
                    <View style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start'
                    }}>
                        <MenuImage style={{width: '50%'}} item={itemWrap}/>
                        <View style={{width: '50%'}}>
                            <MedText>{itemWrap.name}</MedText>
                            <Txt>{itemWrap.description}</Txt>
                            {sideButton}
                        </View>
                    </View>
                    <View style={{display:'flex', flexDirection: 'row'}}>
                        {mods}
                    </View>

                    <View style={{
                        position: 'absolute',
                        bottom: -25,
                        left: 20,
                        display: 'flex',
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'center',
                    }}>

                        <CircleButton onPress={() => {
                            this.props.addToCart(itemWrap)
                            this.props.navigation.navigate('MenuPicker')
                        }}>
                            <ColoredText>+</ColoredText>
                        </CircleButton>
                    </View>
                </MenuItemWrap>
                </Body>
                <BottomNavigation/>
            </MainWrap>
        )
    }
}

function mapStateToProps(state) {
    return {
        cart: state.cart,
        moddedSide: state.moddedSide
    }
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        addToCart,
    }, dispatch)
)

export default withNavigation(connect(
    mapStateToProps,
    mapDispatchToProps
) (ModifyItem))


//



