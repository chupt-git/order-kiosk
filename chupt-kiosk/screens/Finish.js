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
//   async componentWillMount() {
//     try {
//       const authCode = 'sq0acp-fVODnMIETO2wuZPPMTKAKTNiq5H-aBzSFp_pFoQ0JrE'
//       // authCode is a mobile authorization code from the Mobile Authorization API
//       const authorizedLocation = await authorizeAsync(authCode);
//
//       console.log(authorizedLocation);
//       // Authorized and authorizedLocation is available
//     } catch(ex) {
//       console.log(ex);
//       switch(ex.code) {
//         case AuthorizeErrorNoNetwork:
//           // Remind connecting to network
//           break;
//         case UsageError:
//           let errorMessage = ex.message;
//           if (__DEV__) {
//             errorMessage += `\n\nDebug Message: ${ex.debugMessage}`;
//             console.log(`${ex.code}:${ex.debugCode}:${ex.debugMessage}`)
//           }
//           Alert.alert('Error', errorMessage);
//           break;
//       }
//     }
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
