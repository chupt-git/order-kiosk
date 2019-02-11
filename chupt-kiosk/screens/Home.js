import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { ThemeProvider } from 'styled-components/native'
import theme from '../components/theme';
import ButtonWrap from '../components/ButtonWrap';
import MainButton from '../components/MainButton';
import ButtonText from '../components/ButtonText';
import MainWrap from '../components/MainWrap';
import { fetchProducts } from '../kioskActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Home extends React.Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
      this.props.dispatch(fetchProducts())
  }

  render() {

    return (
        <MainWrap home>
          <Image source={require('../assets/logo.png')}/>

          <ButtonWrap>
            <MainButton
              onPress={() => this.props.navigation.navigate('Menu', {
                menuList: this.props.menu
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
    );
  }
}

function mapStateToProps(state) {
    return {
        menu: state.menu
    }
}

// function mapDispatchToProps(dispatch) {
//     return {
//       addToCart: dispatch({ type: 'ADD_TO_CART' }),
//         ...bindActionCreators({ fetchProducts }, dispatch)
//     }
// }

export default connect(mapStateToProps)(Home)
