import React from 'react'
import { FlatList, View, TextInput } from 'react-native'
import {fetchPickup} from "../kioskActions";
import {connect} from "react-redux"
import TopNavigation from "./TopNavigation"
import Body from '../components/Body'
import MainWrap from '../components/MainWrap'
import PickupButton from '../components/PickupButton'
import ColoredText from '../components/ColoredText'
import HeaderText from '../components/HeaderText'
import MedText from '../components/MedText'
import MainButton from '../components/MainButton'


class Pickup extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchPickup())
  }

  render() {
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
                              style={{width: '100%'}}
                              keyExtractor={(item, index) => index.toString()}
                              data={this.props.lockers}
                              numColumns={4}
                              renderItem={({item}) => {
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
                          <TextInput
                              style={{
                                  height: 70,
                                  backgroundColor: '#fff',
                                  padding: 5,
                                  marginTop: 15,
                                  fontSize: 20
                              }}
                              placeholder="Enter Phone Number"
                              keyboardType={'phone-pad'}
                              autoComplete={'tel'}
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
                          green
                          medWidth
                          centerText
                          onPress={() => this.props.navigation.navigate('Checkout')}>
                          <ColoredText>SIGN IN</ColoredText>
                      </MainButton>
                  </View>
              </View>
              </Body>
          </MainWrap>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    lockers: state.lockers
  }
}

export default connect(mapStateToProps)(Pickup)


