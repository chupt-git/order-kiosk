// import { ExportToCsv } from 'export-to-csv';
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  sendOrder,
  contactChange,
  getAuthCode
} from '../kioskActions'
import {View, Text, Alert} from 'react-native'
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
} from 'react-native-square-reader-sdk'


// async function getAuthCode() {
//   try {
//     return await authorize(config);
//       // result includes accessToken, accessTokenExpirationDate and refreshToken
//       console.log(result)
//   } catch (error) {
//     console.log(error);
//   }
// }

async function checkToken(token) {
  console.log(token);
  if (token){
    try {
      // authCode is a mobile authorization code from the Mobile Authorization API
      const authorizedLocation = await authorizeAsync(token);
      // Authorized and authorizedLocation is available
      console.log(authorizedLocation);
    } catch(ex) {
      console.log(ex);
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
  }
}

class Checkout extends React.Component {
  constructor(props) {
     super(props);
  }

  async componentDidMount() {
    this.props.getAuthCode()
  }
  render() {
    checkToken(this.props.token)
    // console.log(this.props.token)

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
        amount: state.amount,
        token: state.token
    }
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    sendOrder,
    contactChange,
    getAuthCode
  }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
