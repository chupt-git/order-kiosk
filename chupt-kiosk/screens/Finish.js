import React from 'react';
import { Text, View, Button, Alert } from 'react-native'
import {
  authorizeAsync,
  AuthorizeErrorNoNetwork,
  getAuthorizedLocationAsync,
  UsageError,
  startReaderSettingsAsync,
  ReaderSettingsErrorSdkNotAuthorized,
  startCheckoutAsync,
  CheckoutErrorCancelled,
  CheckoutErrorSdkNotAuthorized,
} from 'react-native-square-reader-sdk'
import Home from "./Home"
import MainWrap from '../components/MainWrap'
import HeaderText from '../components/HeaderText'
import ColoredText from '../components/ColoredText'
import MainButton from '../components/MainButton'
import ButtonText from '../components/ButtonText'

class Finish extends React.Component {
  // async componentWillMount() {
  //   try {
  //     await startReaderSettingsAsync();
  //   } catch (ex) {
  //     console.log(ex)
  //     switch(ex.code) {
  //       case ReaderSettingsErrorSdkNotAuthorized:
  //         // Handle reader settings not authorized
  //         break;
  //       case UsageError:
  //         let errorMessage = ex.message;
  //         if (__DEV__) {
  //           errorMessage += `\n\nDebug Message: ${ex.debugMessage}`;
  //           console.log(`${ex.code}:${ex.debugCode}:${ex.debugMessage}`)
  //         }
  //         Alert.alert('Error', errorMessage);
  //         break;
  //     }
  //   }
  //
  //   // try {
  //   //   // authCode is a mobile authorization code from the Mobile Authorization API
  //   //   const authorizedLocation = await authorizeAsync('sq0acp-G7NymXx00omA0eiGAMOJsKsBH6hd8UCadxSKG58DXds');
  //   //   // Authorized and authorizedLocation is available
  //   // } catch(ex) {
  //   //   switch(ex.code) {
  //   //     case AuthorizeErrorNoNetwork:
  //   //       console.log("OOO")
  //   //       // Remind connecting to network
  //   //       break;
  //   //     case UsageError:
  //   //       let errorMessage = ex.message;
  //   //       if (__DEV__) {
  //   //         errorMessage += `\n\nDebug Message: ${ex.debugMessage}`;
  //   //         console.log(`${ex.code}:${ex.debugCode}:${ex.debugMessage}`)
  //   //       }
  //   //       Alert.alert('Error', errorMessage);
  //   //       break;
  //   //   }
  //   // }
  // }

  // async onCheckout() {
  //   const checkoutParams = {
  //     amountMoney: {
  //       amount: 1,
  //       currencyCode: 'USD', // optional, use authorized location's currency code by default
  //     },
  //     // Optional for all following configuration
  //     skipReceipt: false,
  //     collectSignature: true,
  //     allowSplitTender: false,
  //     note: 'Hello 💳 💰 World!',
  //     tipSettings: {
  //       showCustomTipField: true,
  //       showSeparateTipScreen: false,
  //       tipPercentages: [15, 20, 30],
  //     },
  //     additionalPaymentTypes: ['cash', 'manual_card_entry', 'other'],
  //   };
  //
  //   try {
  //     const checkoutResult = await startCheckoutAsync(checkoutParams);
  //     // checkout finished successfully and checkoutResult is available
  //   } catch(ex) {
  //     switch (ex.code) {
  //       case CheckoutErrorCancelled:
  //         // Handle canceled transaction here
  //         break;
  //       case CheckoutErrorSdkNotAuthorized:
  //         // Handle sdk not authorized
  //         break;
  //       default:
  //         let errorMessage = ex.message;
  //         if (__DEV__) {
  //           errorMessage += `\n\nDebug Message: ${ex.debugMessage}`;
  //           console.log(`${ex.code}:${ex.debugCode}:${ex.debugMessage}`)
  //         }
  //         Alert.alert('Error', errorMessage);
  //         break;
  //     }
  //   }
  //
  // }

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