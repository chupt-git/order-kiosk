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
  constructor (props) {
    super(props)
    this.state = {
      menuList: [],
      cart: [],
    }
  }

componentDidMount () {
  return fetch('http://192.168.1.9:5000/pods/0e1c3f27-9a27-4ce4-96f4-9751232776cc/menu')
    .then((response) => response.json())
    .then((responseJson) => {
      // console.log('It worked and returned the following:')
      // console.log(responseJson);

      const newMenuList = this.state.menuList.map((item) => Object.assign({}, item))
      responseJson.menu.forEach(x => {
        newMenuList.push({
          name: x.name,
          description: x.description,
          images: x.images,
          // price: x.price,
          type: x.type
        })
      })
      this.setState({
          menuList: newMenuList
      })
    })
    .catch(function(error) {
      console.log(error.message);
      throw error;
    });
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <MainWrap home>
          <Image
            source={require('../assets/logo.png')}
          />
          <ButtonWrap>
            <MainButton
              onPress={() => this.props.navigation.navigate('Menu', {
                menuList: this.state.menuList,
              })}>
              <Image source={require('../assets/arrow_right.png')}/>
              <ButtonText>
                Start
              </ButtonText>
            </MainButton>
            <MainButton
              onPress={() => this.props.navigation.navigate('Pickup')}>
              <Image source={require('../assets/arrow_up.png')}/>
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
