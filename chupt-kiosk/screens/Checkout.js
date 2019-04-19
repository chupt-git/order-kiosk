import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  sendOrder,
  contactChange
} from '../kioskActions'
import {View, Text} from 'react-native'
import TopNavigation from "./TopNavigation"
import HeaderText from '../components/HeaderText'
import MedText from '../components/MedText'
import Body from '../components/Body'
import MainWrap from '../components/MainWrap'
import InputBox from '../components/InputBox'
import ColoredText from "./CartNavigation"
import MainButton from '../components/MainButton'

import {
  authorizeAsync,
  AuthorizeErrorNoNetwork,
  UsageError,
} from 'react-native-square-reader-sdk';
import { authorize } from 'react-native-app-auth'
const config = {
  issuer: 'http://localhost:8000/',
  clientId: 'sq0idp-EEr0UerVULRXtF1xdh3zLw',
  redirectUrl: 'host.exp.exponent',
  scopes: ["PAYMENTS_WRITE_IN_PERSON ",
            "MERCHANT_PROFILE_READ ",
            "PAYMENTS_READ ",
            "PAYMENTS_WRITE"],
  clientSecret: 'sq0csp-TBFE6x2YOWPmYOloBF0_gdFZ1mA2dXRhW56zxTl5kEM',
  additionalParameters: {
    approval_prompt: 'force'
  },
  dangerouslyAllowInsecureHttpRequest: true
};

async function test() {
  try {
    const result = await authorize(config);
      // result includes accessToken, accessTokenExpirationDate and refreshToken
      console.log(result)
  } catch (error) {
    console.log(error);
  }
}

class Checkout extends React.Component {
  constructor(props) {
     super(props);
  }
  async componentDidMount() {
    test()
    // try {
    //   // authCode is a mobile authorization code from the Mobile Authorization API
    //   const authorizedLocation = await authorizeAsync(authCode);
    //   // Authorized and authorizedLocation is available
    // } catch(ex) {
    //   switch(ex.code) {
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
  render() {
    let invalid = true
    for (let i in this.props.contact) {
      if (this.props.contact[i].valid === false) {
        invalid = true
        break
      } else {
        invalid = false
      }
    }

    return (
        <MainWrap>
            <TopNavigation/>
            <Body>
            <View style={{
              width: '97%',
              marginTop: 50,
              display: 'flex',
              justifyContent: 'space-between'}}>
                <HeaderText style={{marginBottom: 0}} left big>Checkout</HeaderText>

                <View>
                    <View>
                        <MedText  blue style={{marginTop: 10}}>INFO</MedText>
                        <InputBox
                          placeholder="Full Name"
                          onChangeText={(input) => this.props.contactChange(input, 'name')}
                        />

                        <InputBox
                            placeholder="Phone Number (PIN)"
                            keyboardType={'phone-pad'}
                            autoComplete={'tel'}
                            onChangeText={(input) => this.props.contactChange(input, 'number')}
                        />
                        <InputBox
                          placeholder="Email Address"
                          onChangeText={(input) => this.props.contactChange(input, 'email')}/>
                    </View>
                </View>

                <View style={{
                  display:'flex',
                  flexDirection: 'row',
                  alignItems: 'baseline',
                  marginTop: 10}}>
                    <MedText blue>Total:</MedText>
                    <MedText>${this.props.amount.toFixed(2)}</MedText>
                </View>
                <MainButton
                    disabled={invalid}
                    noBorder
                    fullWidth
                    onPress={() => {this.props.sendOrder(this.props.cart, this.props.contact, this.props.amount), this.props.navigation.navigate('Home')}}
                >
                    <Text
                      style={{
                        textAlign: 'center',
                        color: '#fff',
                        fontSize: 20,
                        width: '100%'}}>
                         Finish
                    </Text>
                </MainButton>
            </View>
            </Body>
        </MainWrap>
    );
  }
}

function mapStateToProps(state) {
    return {
        cart: state.cart,
        contact: state.contact,
        pickupType: state.pickupType,
        amount: state.amount
    }
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    sendOrder,
    contactChange
  }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
