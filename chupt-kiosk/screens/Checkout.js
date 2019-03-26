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
import ColoredText from "./CartNavigation"
import MainButton from '../components/MainButton'

class Checkout extends React.Component {
  render() {

    return (
        <MainWrap>
            <TopNavigation/>
            <Body>
            <View style={{width: '97%', marginTop: 50, display: 'flex', justifyContent: 'space-between'}}>
                <HeaderText style={{marginBottom: 0}} left big>Checkout</HeaderText>
                
                <View>
                    <View>
                        <MedText  blue style={{marginTop: 10}}>INFO</MedText>
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

                <View style={{display:'flex',flexDirection: 'row', alignItems: 'baseline'}}>
                    <MedText blue>Total:</MedText>
                    <MedText>${this.props.amount.toFixed(2)}</MedText>
                </View>
                <MainButton
                    style={{marginRight: 10, marginLeft: 10,}}
                    noBorder
                    fullWidth
                    onPress={() => this.props.navigation.navigate('Finish')}>
                    <ColoredText>Finish</ColoredText>
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






// <Button
//     disabled={empty}
//     title="Finish"
//     onPress={() => {this.props.sendOrder(this.props.cart, contact)}}/>