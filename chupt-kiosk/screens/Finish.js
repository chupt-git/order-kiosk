import React from 'react';
import { Text, View, Button, Alert } from 'react-native'
// import {
//   authorizeAsync,
//   AuthorizeErrorNoNetwork,
//   getAuthorizedLocationAsync,
//   UsageError,
//   startReaderSettingsAsync,
//   ReaderSettingsErrorSdkNotAuthorized,
//   startCheckoutAsync,
//   CheckoutErrorCancelled,
//   CheckoutErrorSdkNotAuthorized,
// } from 'react-native-square-reader-sdk'
import Home from "./Home"
import MainWrap from '../components/MainWrap'
import HeaderText from '../components/HeaderText'
import ColoredText from '../components/ColoredText'
import MainButton from '../components/MainButton'
import ButtonText from '../components/ButtonText'


class Finish extends React.Component {

  render() {
    return (
        <MainWrap home>
          <View style={{
            width: '90%',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <ButtonText>Congratulations!</ButtonText>
            <ButtonText style={{marginTop: 50}} >Locker 15</ButtonText>
            <ButtonText style={{marginTop: 50, marginBottom: 50}} small>Your order has been successfully received!
              Your order will be ready in 5 minutes.</ButtonText>

            <MainButton
                style={{width: '75%'}}
                onPress={() => this.props.navigation.navigate('Pickup')}
                white
                home>
              <ButtonText style={{width: '100%'}} center small green>
                Open Locker
              </ButtonText>
            </MainButton>
            <MainButton
                style={{width: '75%'}}
                onPress={() => this.props.navigation.navigate('MenuPicker', {
                  menu: this.props.menu
                })}
                blue
                home>
              <ButtonText style={{width: '100%'}} center small>
                New Order
              </ButtonText>
            </MainButton>
          </View>
        </MainWrap>
    )
  }
}

export default Finish
