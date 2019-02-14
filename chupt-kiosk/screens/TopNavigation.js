import React from 'react';
import HeaderHat from '../components/HeaderHat';
import HatWrapper from '../components/HatWrapper';
import { LinearGradient } from 'expo';
import LogoImg from '../components/LogoImg'
import ColoredText from '../components/ColoredText';

class TopNavigation extends React.Component {
  render() {
    return (
      <HatWrapper>
        <LinearGradient
          colors={['#3993F3', '#3993F3', '#4284C5']}
          style={{ height: "70%", width: "80%", position: 'relative' }}>
        <LogoImg width="100" source={require('../assets/chuptLogo.png')}/>
        </LinearGradient>

        <HeaderHat>
          <ColoredText>
            Meals: 6.50  -  Entrées: 5.00 - Sides: 2.50 - Drinks:1.00
          </ColoredText>
        </HeaderHat>
      </HatWrapper>
    );
  }
}

export default TopNavigation;
