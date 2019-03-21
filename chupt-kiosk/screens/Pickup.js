import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import {fetchPickup} from "../kioskActions";

class Pickup extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchPickup())
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Pickup</Text>
        <Button
        title="Back to Start"
        onPress={() => this.props.navigation.navigate('Home')}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'red',
  },
})

export default Pickup


// let pickupbuttons = Array(24).fill(2)
// // for (leti=0; i < 25; i++) {
// //   pickupbuttons.push (
// //
// //   )
// // }