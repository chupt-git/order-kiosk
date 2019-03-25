import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  sendOrder,
  changeNameInput,
  changePhoneInput,
  changePickupTypeInput
} from '../kioskActions'
import {View, Text} from 'react-native'
import TopNavigation from "./TopNavigation"
import HeaderText from '../components/HeaderText'
import MedText from '../components/MedText'
import Body from '../components/Body'
import MainWrap from '../components/MainWrap'
import InputBox from '../components/InputBox'

class Checkout extends React.Component {
  render() {
    // let empty = true
    // let contact
    //
    // if (this.props.number && this.props.name && this.props.pickupType) {
    //   contact = Object.assign(this.props.number, this.props.name, this.props.pickupType)
    //   empty = false
    // }else {
    //   empty = true
    // }

    return (
        <MainWrap>
            <TopNavigation/>
            <Body>
                <View style={{width: '97%', height: '90%', display: 'flex', justifyContent: 'space-around'}}>
                    <View>
                        <HeaderText left big>Checkout</HeaderText>
                        <View>
                            <MedText  blue style={{marginTop: 50}}>INFO</MedText>
                            <InputBox placeholder="Full Name"/>
                            <InputBox
                                placeholder="Phone Number (PIN)"
                                keyboardType={'phone-pad'}
                                autoComplete={'tel'}
                            />
                            <InputBox placeholder="Email Address"/>
                        </View>
                        <View style={{height: 3, width: '100%', backgroundColor: '#959595', marginTop: 20, marginBottom: 20}}/>
                        <View>
                            <MedText blue>PAYMENT INFO</MedText>
                            <InputBox placeholder="Full Name"/>
                            <InputBox placeholder="Address"/>
                            <View>
                                <InputBox placeholder="City"/>
                                <InputBox placeholder="Zip Code"/>
                            </View>
                            <InputBox placeholder="Credit Card Number"/>
                        </View>
                    </View>
                    <View>
                        <MedText blue>Total:</MedText>
                        <Text>${this.props.amount.toFixed(2)}</Text>
                    </View>
                </View>
            </Body>
        </MainWrap>
    );
  }
}

function mapStateToProps(state) {
    return {
        cart: state.cart,
        name: state.name,
        number: state.number,
        pickupType: state.pickupType,
        amount: state.amount
    }
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    sendOrder,
    changeNameInput,
    changePhoneInput,
    changePickupTypeInput,
  }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)

// this.props.navigation.navigate('Finish')
//



// <View
// style={{
//     display: 'flex',
//         alignItems: 'center',
//         width: '100%'
// }}>
// <MainButton
// noBorder
// green
// medWidth
// centerText
// onPress={() => this.props.navigation.navigate('Checkout')}>
// <ColoredText>SIGN IN</ColoredText>
// </MainButton>
// </View>


// <InputBox
// style={{borderWidth: 1, borderColor: '#d6d7da', width: '50%'}}
// keyboardType={'phone-pad'}
// autoComplete={'tel'}
// placeholder={'Phone Number'}
// value={this.props.number.number}
// onChangeText={(number) => this.props.changePhoneInput(number)}
// />
//
// <InputBox
//     style={{borderWidth: 1, borderColor: '#d6d7da', width: '50%'}}
//     placeholder={'Name'}
//     value={this.props.name.name}
//     onChangeText={(name) => this.props.changeNameInput(name)}
// />
//
// <Picker
// selectedValue={this.props.pickupType.pickupType}
// style={{height: 50, width: '50%'}}
// onValueChange={(itemValue) =>
// this.props.changePickupTypeInput(itemValue)
// }>
// <Picker.Item label="Window" value="Window" />
//     <Picker.Item label="Locker" value="Locker" />
//     </Picker>
//
// <Button
//     disabled={empty}
//     title="Finish"
//     onPress={() => {this.props.sendOrder(this.props.cart, contact)}}/>