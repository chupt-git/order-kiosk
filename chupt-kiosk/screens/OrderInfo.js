import React from 'react';
import {FlatList, Text, TextInput, View} from 'react-native'
import {connect} from "react-redux"
import { bindActionCreators } from 'redux'
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
        const orderInfo = this.props.orderAndContact

        if (!Object.keys(orderInfo).length) {
          return null
        } else {
          console.log(orderInfo.orderAndContact.items)
          return (
              <MainWrap>
                  <TopNavigation/>
                  <Body>
                      <View style={{width: '97%', height: '90%', display: 'flex', justifyContent: 'space-around'}}>
                          <View>
                              <HeaderText style={{marginBottom: 20}} left big>Pickup</HeaderText>
                              <View style={{display:'flex', flexDirection: 'row', alignItems: 'center'}}>
                                  <PickupButton style={{height: 150}} status='full'>
                                       <ButtonText noPad>{orderInfo.orderAndContact.locker_number}</ButtonText>
                                  </PickupButton>

                                  <View style={{
                                      marginLeft: 10,
                                      height: 120,
                                      display: 'flex',
                                      justifyContent: 'space-around'
                                  }}>
                                      <Txt bold>{orderInfo.orderAndContact.name}</Txt>
                                      <Txt bold>541-602-6215</Txt>
                                      <Txt bold>Order ID: {orderInfo.orderAndContact.order_id}</Txt>
                                  </View>
                              </View>

                          </View>


                          <MainButton
                              green
                              fullWidth
                              home
                              centerText
                              onPress={() => this.props.navigation.navigate('LockerOpened')}>
                              <HeaderText center big white light>Open Locker</HeaderText>
                          </MainButton>
                      </View>
                  </Body>
              </MainWrap>
          )
        }
    }
}

function mapStateToProps(state) {
  return {
    orderAndContact: state.orderAndContact
  }
}


export default connect(mapStateToProps)(OrderInfo)




// <FlatList
//     style={{width: '100%', padding: 20}}
//     data={orderInfo.orderAndContact.items}
//     renderItem={(dataItem) => {
//         return (
//             <CartItem
//                 item={dataItem}/>
//         )
//     }}
//     keyExtractor={(item, index) => index.toString()}
// />
