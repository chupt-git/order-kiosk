import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  sendOrder,
  changeNameInput,
  changePhoneInput,
  changePickupTypeInput
} from '../kioskActions'
import { Text, View, Button, TextInput, Picker } from 'react-native'

class Checkout extends React.Component {
  render() {
    let empty = true
    let contact

    if (this.props.number && this.props.name && this.props.pickupType) {
      contact = Object.assign(this.props.number, this.props.name, this.props.pickupType)
      empty = false
    }else {
      empty = true
    }

    return (
      <View style={{display: 'flex', alignItems: 'center'}}>
        <Text>CHECKOUT</Text>
        <TextInput
          style={{borderWidth: 1, borderColor: '#d6d7da', width: '50%'}}
          keyboardType={'phone-pad'}
          autoComplete={'tel'}
          placeholder={'Phone Number'}
          value={this.props.number.number}
          onChangeText={(number) => this.props.changePhoneInput(number)}
          />

        <TextInput
          style={{borderWidth: 1, borderColor: '#d6d7da', width: '50%'}}
          placeholder={'Name'}
          value={this.props.name.name}
          onChangeText={(name) => this.props.changeNameInput(name)}
          />

          <Picker
            selectedValue={this.props.pickupType.pickupType}
            style={{height: 50, width: '50%'}}
            onValueChange={(itemValue) =>
              this.props.changePickupTypeInput(itemValue)
            }>
            <Picker.Item label="Window" value="Window" />
            <Picker.Item label="Locker" value="Locker" />
          </Picker>

        <Button
          disabled={empty}
          title="Finish"
          onPress={() => {this.props.sendOrder(this.props.cart, contact)}}/>
      </View>
    );
  }
}

function mapStateToProps(state) {
    return {
        cart: state.cart,
        name: state.name,
        number: state.number,
        pickupType: state.pickupType
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
