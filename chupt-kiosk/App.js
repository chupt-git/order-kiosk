import React from 'react';
import Navigation from './Navigation';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import storeConfig from './storeConfig';

const store = storeConfig()


export default class App extends React.Component {
  componentDidMount() {
     StatusBar.setHidden(true);
     Expo.ScreenOrientation.allowAsync(Expo.ScreenOrientation.Orientation.LANDSCAPE);
   }
  render() {
    return (
      <Provider store={store}>
        <Navigation/>
      </Provider>
    );
  }
}
