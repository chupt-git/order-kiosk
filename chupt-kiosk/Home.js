import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

class Home extends React.Component {
  render() {
    return (
      <View style={styles.container}>
      <Text>HOME</Text>
        <Button
        title="Start"
        onPress={() => this.props.navigation.navigate('Menu')}/>
        <Button
        title="Pickup"
        onPress={() => this.props.navigation.navigate('Pickup')}/>
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

export default Home;
