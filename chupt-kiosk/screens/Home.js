import React from 'react'
import { Image } from 'react-native'
import ButtonWrap from '../components/ButtonWrap'
import MainButton from '../components/MainButton'
import ButtonText from '../components/ButtonText'
import MainWrap from '../components/MainWrap'
import { fetchProducts } from '../kioskActions'
import { connect } from 'react-redux'

class Home extends React.Component {
  constructor (props) {
    super(props)
  }

  componentWillMount () {
      this.props.dispatch(fetchProducts())
  }

    render() {
    return (
        <MainWrap home>
          <Image style={{width: '65%', resizeMode: 'contain'}}  source={require('../assets/fullLogo.png')}/>

          <ButtonWrap>
            <MainButton
              style={{width: '75%'}}
              onPress={() => this.props.navigation.navigate('MenuPicker', {
                menu: this.props.menu
              })}
              white
              home>
              <ButtonText green>
                → Start
              </ButtonText>
            </MainButton>
            <MainButton
              style={{width: '75%'}}
              onPress={() => this.props.navigation.navigate('Pickup')}
              blue
              home>
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
