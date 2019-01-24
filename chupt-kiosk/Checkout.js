import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

class Finish extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>CHECKOUT</Text>
        <Button
        title="Finish"
        onPress={() => this.props.navigation.navigate('Finish')}/>
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
});

export default Finish;
