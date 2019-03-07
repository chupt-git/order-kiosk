import React from 'react';
import { Text, View, Button,Alert, Platform } from 'react-native'
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
} from 'react-native-square-reader-sdk';

class Finish extends React.Component {
  async componentWillMount() {
    // try {
    //   await startReaderSettingsAsync();
    // } catch(e) {
    //
    // }

    try {
      await startReaderSettingsAsync();
    } catch (ex) {
      console.log(ex);
      // switch(ex.code) {
      //   case ReaderSettingsErrorSdkNotAuthorized:
      //     console.log('NOT WORKING 1');
      //     // Handle reader settings not authorized
      //     break;
      //   case UsageError:
      //     console.log("NOT WORKING 2");
      //     let errorMessage = ex.message;
      //     if (__DEV__) {
      //       errorMessage += `\n\nDebug Message: ${ex.debugMessage}`;
      //       console.log(`${ex.code}:${ex.debugCode}:${ex.debugMessage}`)
      //     }
      //     Alert.alert('Error', errorMessage);
      //     break;
      // }
    }

    // // A checkout parameter is required for this checkout method
    // const checkoutParams = {
    //   amountMoney: {
    //     amount: 1,
    //     currencyCode: 'USD', // optional, use authorized location's currency code by default
    //   },
    //   // Optional for all following configuration
    //   skipReceipt: false,
    //   collectSignature: true,
    //   allowSplitTender: false,
    //   note: 'ReaderSDKSample Transaction',
    //   tipSettings: {
    //     showCustomTipField: true,
    //     showSeparateTipScreen: false,
    //     tipPercentages: [15, 20, 30],
    //   },
    //   additionalPaymentTypes: ['cash', 'manual_card_entry', 'other'],
    // };
    //
    // try {
    //   const checkoutResult = await startCheckoutAsync(checkoutParams);
    //
    //   Alert.alert(`${checkoutResult} Successfully Charged`, 'See the debugger console for transaction details. You can refund transactions from your Square Dashboard.');
    //   // checkout finished successfully and checkoutResult is available
    // } catch(ex) {
    //   switch(ex.code) {
    //     case CheckoutErrorCancelled:
    //       // Handle canceled transaction here
    //       break;
    //     case CheckoutErrorSdkNotAuthorized:
    //       // Handle sdk not authorized
    //       break;
    //     default:
    //       let errorMessage = ex.message;
    //       if (__DEV__) {
    //         errorMessage += `\n\nDebug Message: ${ex.debugMessage}`;
    //         console.log(`${ex.code}:${ex.debugCode}:${ex.debugMessage}`)
    //       }
    //       Alert.alert('Error', errorMessage);
    //       break;
    //   }
    // }
    // try {
    //   const authCode = 'sq0acp-znUl4lX2pcOIxeQ603suk5v-f9gNRowa2eqZwsIJO5s';
    //
    //   const authorizedLocation = await authorizeAsync(authCode);
    //   // authCode is a mobile authorization code from the Mobile Authorization API
    //   // const authorizedLocation = await authorizeAsync(authCode);
    //   // Authorized and authorizedLocation is available
    // } catch(ex) {
    //   switch (ex.code) {
    //     case AuthorizeErrorNoNetwork:
    //       // Remind connecting to network
    //       break;
    //     case UsageError:
    //       let errorMessage = ex.message;
    //       if (__DEV__) {
    //         errorMessage += `\n\nDebug Message: ${ex.debugMessage}`;
    //         console.log(`${ex.code}:${ex.debugCode}:${ex.debugMessage}`)
    //       }
    //       Alert.alert('Error', errorMessage);
    //       break;
    //   }
    // }
  }

  static async onCheckout() {
    // const { navigate } = this.props.navigation;
    // A checkout parameter is required for this checkout method
    const checkoutParams = {
      amountMoney: {
        amount: 1,
        currencyCode: 'USD', // optional, use authorized location's currency code by default
      },
      // Optional for all following configuration
      skipReceipt: false,
      collectSignature: true,
      allowSplitTender: false,
      note: 'Hello 💳 💰 World!',
      tipSettings: {
        showCustomTipField: true,
        showSeparateTipScreen: false,
        tipPercentages: [15, 20, 30],
      },
      additionalPaymentTypes: ['cash', 'manual_card_entry', 'other'],
    };

    try {
      let test = await startCheckoutAsync(checkoutParams);
      console.log(test)
    } catch (checkoutResult) {
      console.log(checkoutResult);

    }

    // try {
    //   const checkoutResult = await startCheckoutAsync(checkoutParams);
    //
    //   console.log(checkoutResult);
    //   // Consume checkout result from here
    //   // const currencyFormatter = this.props.globalize.getCurrencyFormatter(
    //   //     checkoutResult.totalMoney.currencyCode,
    //   //     { minimumFractionDigits: 0, maximumFractionDigits: 2 },
    //   // );
    //   // const formattedCurrency = currencyFormatter(checkoutResult.totalMoney.amount / 100);
    //   console.log(`Successfully Charged`, 'See the debugger console for transaction details. You can refund transactions from your Square Dashboard.');
    //   console.log(JSON.stringify(checkoutResult));
    // } catch (ex) {
    //   let errorMessage = ex.message;
    //   switch (ex.code) {
    //     case CheckoutErrorCancelled:
    //       // Handle canceled transaction here
    //       console.log('transaction canceled.');
    //       break;
    //     case CheckoutErrorSdkNotAuthorized:
    //       // Handle sdk not authorized
    //       this.props.navigation.navigate('Deauthorizing');
    //       break;
    //     default:
    //       if (__DEV__) {
    //         errorMessage += `\n\nDebug Message: ${ex.debugMessage}`;
    //         console.log(`${ex.code}:${ex.debugCode}:${ex.debugMessage}`);
    //       }
    //       Alert.alert('Error', errorMessage);
    //       break;
    //   }
    // }
  }

  render() {
    return (

      <View style={{paddingTop: 100, display: 'flex', alignItems: 'center'}}>
          <Text>INSERT CARD</Text>
           <Button
           title="Charge $1.00"
           onPress={() => Finish.onCheckout()}
           primary
           />
      </View>
    );
  }
}

export default Finish


// <Button
// title="Charge $1.00"
// onPress={() => this.onCheckout()}
// primary
// />

// <View>
//   <Text>FINISH</Text>
//   <Button
//   title="Back to Start"
//   onPress={() => this.props.navigation.navigate('Home')}/>
// </View>
