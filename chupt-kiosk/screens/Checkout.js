import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { sendOrder, changeNameInput, changePhoneInput } from '../kioskActions'
import { StyleSheet, Text, View, Button, TextInput } from 'react-native'

class Checkout extends React.Component {
  render() {
    if (this.props.number && this.props.name) {
      const contact = Object.assign(this.props.number, this.props.name)
    }
    const cart = this.props.cart
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

        <Button
          title="Finish"
          onPress={() => this.props.sendOrder(cart, contact)}/>
      </View>
    );
  }
}

function mapStateToProps(state) {
    return {
        cart: state.cart,
        name: state.name,
        number: state.number
    }
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    sendOrder,
    changeNameInput,
    changePhoneInput
  }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)

// onPress={() => this.props.navigation.navigate('Finish')}
