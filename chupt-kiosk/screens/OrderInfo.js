import React from 'react';
import {FlatList, Text, TextInput, View} from 'react-native'
import Home from "./Home"
import MainWrap from '../components/MainWrap'
import HeaderText from '../components/HeaderText'
import ColoredText from '../components/ColoredText'
import MainButton from '../components/MainButton'
import ButtonText from '../components/ButtonText'
import TopNavigation from "./TopNavigation";
import Body from '../components/Body'

class OrderInfo extends React.Component {

    render() {
        return (
            <MainWrap>
                <TopNavigation/>
                <Body>
                <View style={{width: '97%', height: '90%', display: 'flex', justifyContent: 'space-around'}}>
                    <View>
                        <View>
                            <HeaderText left margin big>Pickup</HeaderText>

                        </View>

                    </View>
                    <View style={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%'
                    }}>
                        <MainButton
                            noBorder
                            green
                            medWidth
                            centerText
                            onPress={() => this.props.navigation.navigate('Checkout')}>
                            <ColoredText>Open Locker</ColoredText>
                        </MainButton>
                    </View>
                </View>
                </Body>
            </MainWrap>
        )
    }
}

export default OrderInfo