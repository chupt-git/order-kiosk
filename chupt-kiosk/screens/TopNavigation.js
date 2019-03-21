import React from 'react'
import HeaderHat from '../components/HeaderHat'
import HatWrapper from '../components/HatWrapper'
import { LinearGradient } from 'expo'
import LogoImg from '../components/LogoImg'
import ColoredText from '../components/ColoredText'
import CircleButton from '../components/CircleButton'
import { withNavigation } from 'react-navigation'

class TopNavigation extends React.Component {
  render() {
    return (
      <HatWrapper>
        <LinearGradient
          colors={['#3993F3', '#3993F3', '#4284C5']}
          style={{
            height: "80%",
            width: "100%",
            position: 'relative',
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
            display: 'flex',
            justifyContent:'center'}}>
            <CircleButton
              darkBlue
              bigger
              onPress={() =>
                this.props.navigation.goBack()
              }>
              <ColoredText bigger style={{fontSize: 30}}>←</ColoredText>
            </CircleButton>

            <LogoImg source={require('../assets/chuptLogo.png')}/>
        </LinearGradient>

        <HeaderHat style={{position: 'relative', zIndex: -1}}>
          <ColoredText>
            Meals: 6.50  -  Entrées: $5.00 - Sides: $3.00 - Drinks: $1.00
          </ColoredText>
        </HeaderHat>
      </HatWrapper>
    );
  }
}

export default withNavigation(TopNavigation);
