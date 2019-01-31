import React from 'react';
import Navigation from './Navigation';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'react-native';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#333333',
    accent: '#f1c40f',
  }
};

export default class App extends React.Component {
  componentDidMount() {
     StatusBar.setHidden(true);
     Expo.ScreenOrientation.allowAsync(Expo.ScreenOrientation.Orientation.LANDSCAPE);
   }
  render() {
    return (
      <PaperProvider theme={theme}>
        <Navigation/>
      </PaperProvider>
    );
  }
}
