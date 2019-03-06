import React from 'react';
import { Text, View, Button,Alert } from 'react-native'
import {
  authorizeAsync,
  AuthorizeErrorNoNetwork,
  UsageError,
  startReaderSettingsAsync,
  ReaderSettingsErrorSdkNotAuthorized,
  startCheckoutAsync,
  CheckoutErrorCancelled,
  CheckoutErrorSdkNotAuthorized,
} from 'react-native-square-reader-sdk';

class Finish extends React.Component {
  async componentWillMount() {
    try {
      const authCode = 'sq0acp-MzccX1CC-UGKrR7SU5pI29rROMDXzxe8Q49P4vca5jI'
      // authCode is a mobile authorization code from the Mobile Authorization API
      const authorizedLocation = await authorizeAsync(authCode);
      // Authorized and authorizedLocation is available
    } catch(ex) {
      switch(ex.code) {
        case AuthorizeErrorNoNetwork:
          // Remind connecting to network
          break;
        case UsageError:
          let errorMessage = ex.message;
          if (__DEV__) {
            errorMessage += `\n\nDebug Message: ${ex.debugMessage}`;
            console.log(`${ex.code}:${ex.debugCode}:${ex.debugMessage}`)
          }
          Alert.alert('Error', errorMessage);
          break;
      }
    }
    const checkoutParams = {
      amountMoney: {
        amount: 1,
        currencyCode: 'USD', // optional, use authorized location's currency code by default
      },
      // Optional for all following configuration
      skipReceipt: false,
      collectSignature: true,
      allowSplitTender: false,
      tipSettings: {
        showCustomTipField: true,
        showSeparateTipScreen: false,
        tipPercentages: [15, 20, 30],
      },
      additionalPaymentTypes: ['cash', 'manual_card_entry', 'other'],
    };

    try {
      const checkoutResult = await startCheckoutAsync(checkoutParams);
      // checkout finished successfully and checkoutResult is available
      console.log(checkoutResult)

    } catch(ex) {
      switch(ex.code) {
        case CheckoutErrorCancelled:
          // Handle canceled transaction here
          break;
        case CheckoutErrorSdkNotAuthorized:
          // Handle sdk not authorized
          break;
        default:
          let errorMessage = ex.message;
          if (__DEV__) {
            errorMessage += `\n\nDebug Message: ${ex.debugMessage}`;
            console.log(`${ex.code}:${ex.debugCode}:${ex.debugMessage}`)
          }
          Alert.alert('Error', errorMessage);
          break;
      }
    }

    try {
      await startReaderSettingsAsync();
    } catch (ex) {
      switch(ex.code) {
        case ReaderSettingsErrorSdkNotAuthorized:
          // Handle reader settings not authorized
          break;
        case UsageError:
          let errorMessage = ex.message;
          if (__DEV__) {
            errorMessage += `\n\nDebug Message: ${ex.debugMessage}`;
            console.log(`${ex.code}:${ex.debugCode}:${ex.debugMessage}`)
          }
          Alert.alert('Error', errorMessage);
          break;
      }
    }
  }

  render() {
    return (

      <View>
        <View>
          <Text>Take a payment.</Text>
        </View>
        <View>
          <Button
            title="Charge $1.00"
            onPress={() => console.log('test')}
            primary
          />
        </View>
      </View>
    );
  }
}

export default Finish


// <View>
//   <Text>FINISH</Text>
//   <Button
//   title="Back to Start"
//   onPress={() => this.props.navigation.navigate('Home')}/>
// </View>
