import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { ThemeProvider } from 'styled-components/native'
import theme from '../components/theme';
import ButtonWrap from '../components/ButtonWrap';
import MainButton from '../components/MainButton';
import ButtonText from '../components/ButtonText';
import MainWrap from '../components/MainWrap';

// import { Button } from 'react-native-paper';

class Home extends React.Component {

  // constructor (props) {
  //   super(props)
  //   this.state = {
  //     menuList: []
  //   }
  // }
  //
  componentDidMount(){
     Expo.ScreenOrientation.allowAsync(Expo.ScreenOrientation.Orientation.LANDSCAPE);
  }
  //   return fetch('http://192.168.1.9:5000/pods')
  //   .then((response) => response.json())
  //   .then((responseJson) => {
  //     console.log('TEST')
  //
  //     const newMenuList = this.state.menuList.map((item) => Object.assign({}, item))
  //     console.log(newMenuList);
  //       Object.keys(responseJson.pods).forEach(x => {
  //         console.log(x.pod_id);
  //       })
  //   })
  //   .catch(function(error) {
  //     console.log(error.message);
  //     throw error;
  //   });
  // }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <MainWrap>
          <Image
            source={require('../assets/logo.png')}
          />
          <ButtonWrap>
            <MainButton
              onPress={() => this.props.navigation.navigate('Menu')}>
              <Image source={require('../assets/arrow.png')}/>
              <ButtonText>
                Start
              </ButtonText>
            </MainButton>
            <MainButton
              onPress={() => this.props.navigation.navigate('Pickup')}>
              <Image source={require('../assets/arrow_two.png')}/>
              <ButtonText>
                Pickup
              </ButtonText>
            </MainButton>
          </ButtonWrap>
        </MainWrap>
      </ThemeProvider>
    );
  }
}

export default Home;
