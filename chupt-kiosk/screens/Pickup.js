import React from 'react'
import { FlatList, View } from 'react-native'
import { fetchPickup, phoneInputValidation, fetchOrder } from '../kioskActions'
import {connect} from 'react-redux'
import TopNavigation from './TopNavigation'
import Body from '../components/Body'
import MainWrap from '../components/MainWrap'
import PickupButton from '../components/PickupButton'
import ColoredText from '../components/ColoredText'
import HeaderText from '../components/HeaderText'
import MedText from '../components/MedText'
import MainButton from '../components/MainButton'
import InputBox from '../components/InputBox'

class Pickup extends React.Component {
  componentWillMount () {
    this.props.dispatch(fetchPickup())
  }

  render () {
    if (!this.props.lockers.length) {
      return null
    } else {
      return (
        <MainWrap>
          <TopNavigation/>
          <Body>
            <View style={{width: '97%', height: '90%', display: 'flex', justifyContent: 'space-around'}}>
              <View>
                <View>
                  <HeaderText left margin big>Pickup</HeaderText>
                  <FlatList
                    style={{ width: '100%' }}
                    keyExtractor={(item, index) => index.toString()}
                    data={this.props.lockers}
                    numColumns={4}
                    renderItem={({ item }) => {
                      return (
                        <PickupButton status={item.status}>
                          <ColoredText bigger>{item.locker_number}</ColoredText>
                        </PickupButton>
                      )
                    }}
                  />
                </View>
                <View style={{margin: 15}}>
                  <MedText style={{marginTop: 50}}>PHONE NUMBER (PIN)</MedText>
                  <InputBox
                    style={{
                      marginTop: 15
                    }}
                    placeholder="Enter Phone Number"
                    keyboardType={'phone-pad'}
                    autoComplete={'tel'}
                    onChangeText={(input) => this.props.dispatch(phoneInputValidation(input))}
                  />
                </View>
              </View>
              <View style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%'
              }}>
                <MainButton
                  noBorder
                  medWidth
                  centerText
                  disabled={this.props.number.unvalid}
                  onPress={() => this.props.dispatch(fetchOrder('TSnb3gf5M48tzuowqrVRQL'), this.props.navigation.navigate('OrderInfo'))}>
                  <ColoredText>SIGN IN</ColoredText>
                </MainButton>
              </View>
            </View>
          </Body>
        </MainWrap>
      )
    }
  }
}
// onPress={() => this.props.navigation.navigate('OrderInfo')}>
function mapStateToProps (state) {
  return {
    lockers: state.lockers,
    number: state.number
  }
}

export default connect(mapStateToProps)(Pickup)
