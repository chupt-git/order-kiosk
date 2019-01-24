import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

class Menu extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>MENU</Text>
        <Button
        title="Checkout"
        onPress={() => this.props.navigation.navigate('Checkout')}/>

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

export default Menu;
