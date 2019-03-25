import React from 'react'
import { View, FlatList } from 'react-native'
import MainWrap from '../components/MainWrap'
import ButtonText from '../components/ButtonText'
import Body from '../components/Body'
import ColoredText from '../components/ColoredText'
import TopNavigation from './TopNavigation'
import BottomNavigation from './BottomNavigation'
import MainButton from '../components/MainButton'
import Menu from "./Menu"
import DeleteMenuModal from './DeleteMenuModal'


class MenuPicker extends React.Component {

    render() {
        const menu = this.props.navigation.state.params.menu.products
        const types = []
        Object.keys(menu).forEach((key) => {
            const name = key.charAt(0).toUpperCase() + key.slice(1)
            const a = menu[key][0].amount.toFixed(2).match(/^([^.]+)/)[0]
            const b = menu[key][0].amount.toFixed(2).match(/[^.]*$/)[0]
            types.push({type: key, displayName: name, price: {front: a, back: b, full: menu[key][0].amount.toFixed(2)}})
        })
        types.sort((a, b) => parseFloat(b.price.full) - parseFloat(a.price.full))
        return (
            <MainWrap>
                <TopNavigation/>
                <DeleteMenuModal/>
                <Body>
                <FlatList
                    contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
                    style={{width: '95%'}}
                    data={types}
                    renderItem={({item}) => {
                        return (
                            <MainButton
                                type={item.type}
                                onPress={() => this.props.navigation.navigate('Menu', {
                                    type: item.type,
                                    price: item.price,
                                    displayName: item.displayName
                                })}
                                fullWidth
                                center
                                style={{
                                    width: '100%',
                                    overflow: 'hidden',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                    alignItems: 'flex-end'
                                }}>

                                <ButtonText>{item.displayName}</ButtonText>

                                <View style={{
                                    height: 80,
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'flex-end'
                                }}>
                                    <ButtonText>${item.price.front}</ButtonText>
                                    <ColoredText
                                        style={{
                                            fontSize: 40,
                                            lineHeight: 40,
                                            alignSelf: 'flex-start'
                                        }}>
                                        .{item.price.back}
                                    </ColoredText>
                                </View>

                            </MainButton>
                        )
                    }}
                    keyExtractor={(item, index) => index.toString()}
                />
                </Body>
                <BottomNavigation/>
            </MainWrap>
        );
    }
}

export default MenuPicker
