import React from 'react';
import {FlatList, Text, TextInput, View} from 'react-native'
import Home from "./Home"
import MainWrap from '../components/MainWrap'
import HeaderText from '../components/HeaderText'
import ColoredText from '../components/ColoredText'
import MainButton from '../components/MainButton'
import ButtonText from '../components/ButtonText'
import TopNavigation from "./TopNavigation"
import Body from '../components/Body'
import Txt from "../components/Txt"
import PickupButton from '../components/PickupButton'

class OrderInfo extends React.Component {

    render() {
        return (
            <MainWrap>
                <TopNavigation/>
                <Body>
                    <View style={{width: '97%', height: '90%', display: 'flex', justifyContent: 'space-around'}}>
                        <View>
                        <HeaderText style={{marginBottom: 50}} left big>Pickup</HeaderText>

                            <View style={{display:'flex', flexDirection: 'row', alignItems: 'center'}}>
                                <PickupButton style={{height: 150}} status='full'>
                                     <ColoredText bigger>12</ColoredText>
                                </PickupButton>

                                <View style={{
                                    marginLeft: 10,
                                    height: 150,
                                    display: 'flex',
                                    justifyContent: 'space-around'
                                }}>
                                    <Txt bold>Jane Doe</Txt>
                                    <Txt bold>541-602-6215</Txt>
                                    <Txt bold>Order ID: 12345</Txt>
                                </View>
                            </View>

                            <View style={{marginLeft: 50, marginTop: 50}}>
                                <View>
                                    <Txt bold blue style={{marginBottom: 10}}>Meals:</Txt>

                                    <View style={{marginLeft: 10}}>
                                        <Txt style={{maxWidth: '50%'}} light>
                                            Meal Name
                                        </Txt>
                                        <View style={{marginLeft: 10}}>
                                            <Text style={{marginBottom: 2, color:'#919191'}}>
                                                - No Sauce
                                            </Text>
                                        </View>
                                    </View>
                                </View>

                                <View>
                                    <Txt bold blue style={{marginBottom: 10}}>Entrees:</Txt>

                                    <View style={{marginLeft: 10}}>
                                        <Txt style={{maxWidth: '50%'}} light>
                                            Entree Name
                                        </Txt>
                                        <View style={{marginLeft: 10}}>
                                            <Text style={{marginBottom: 2, color:'#919191'}}>
                                                - Mild For Heat
                                            </Text>
                                            <Text style={{marginBottom: 2, color:'#919191'}}>
                                                - No Carrot
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>


                        <MainButton
                            noBorder
                            green
                            fullWidth
                            centerText
                            onPress={() => this.props.navigation.navigate('Checkout')}>
                            <ColoredText>Open Locker</ColoredText>
                        </MainButton>
                    </View>
                </Body>
            </MainWrap>
        )
    }
}

export default OrderInfo

// <View style={{display:'flex', flexDirection: 'row'}}>
// <PickupButton status='full'>
//     <ColoredText bigger>12</ColoredText>
// </PickupButton>
// <View>
// <Text>Jane Doe</Text>
// <Text>541-602-6215</Text>
// <Text>Order ID: 12345</Text>
// </View>
// </View>

// <View style={{
//     display: 'flex',
//         alignItems: 'center',
//         width: '100%'
// }}>