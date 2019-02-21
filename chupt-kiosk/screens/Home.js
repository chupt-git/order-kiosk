import React from 'react'
import { View, TouchableOpacity, Text, Image } from 'react-native'
import { ThemeProvider } from 'styled-components/native'
import theme from '../components/theme'
import ButtonWrap from '../components/ButtonWrap'
import MainButton from '../components/MainButton'
import ButtonText from '../components/ButtonText'
import MainWrap from '../components/MainWrap'
import LogoImg from '../components/LogoImg'
import { fetchProducts } from '../kioskActions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

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
              onPress={() => this.props.navigation.navigate('MenuPicker', {
                menu: this.props.menu
              })}
              white>
              <ButtonText green>
                → Start
              </ButtonText>
            </MainButton>
            <MainButton
              onPress={() => this.props.navigation.navigate('Pickup')}
              blue>
              <ButtonText>
                ↑ Pickup
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

export default connect(mapStateToProps)(Home)
