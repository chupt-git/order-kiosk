import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native'


class Finish extends React.Component {
  render() {
    return (
      <View>
        <Text>FINISH</Text>
        <Button
        title="Back to Start"
        onPress={() => this.props.navigation.navigate('Home')}/>
      </View>
    );
  }
}

export default Finish
