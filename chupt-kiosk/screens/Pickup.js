import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import {fetchPickup} from "../kioskActions";

class Pickup extends React.Component {
  render() {
    this.props.dispatch(fetchPickup())
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
