import React from 'react';
import HeaderHat from '../components/HeaderHat';
import HatWrapper from '../components/HatWrapper';
import { LinearGradient } from 'expo';
import LogoImg from '../components/LogoImg'
import ColoredText from '../components/ColoredText';

class BottomNavigation extends React.Component {
  render() {
    return (
      <HatWrapper bottomHat>
        <HeaderHat>
        </HeaderHat>

        <LinearGradient
          colors={['#4284C5', '#3993F3', '#3993F3']}
          style={{ height: "70%", width: "80%", position: 'relative' }}>
        </LinearGradient>

      </HatWrapper>
    );
  }
}

export default BottomNavigation;
