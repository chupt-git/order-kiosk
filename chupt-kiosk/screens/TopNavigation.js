import React from 'react'
import HeaderHat from '../components/HeaderHat'
import HatWrapper from '../components/HatWrapper'
import { LinearGradient } from 'expo'
import LogoImg from '../components/LogoImg'
import ColoredText from '../components/ColoredText'
import CircleButton from '../components/CircleButton'
import { withNavigation } from 'react-navigation'
import { View } from 'react-native'

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

        <HeaderHat style={{
            position: 'relative',
            zIndex: -1
            }}>
            <View style={{width: '80%', display:'flex', alignItems: 'center'}}>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width:'95%',
                    justifyContent: 'space-between'}}>
                    <ColoredText>Meals: 6.50</ColoredText>
                    <ColoredText>Entrées: $5.00</ColoredText>
                    <ColoredText>Sides: $3.00</ColoredText>
                    <ColoredText>Drinks: $1.00</ColoredText>
                </View>
            </View>
        </HeaderHat>
      </HatWrapper>
    );
  }
}

export default withNavigation(TopNavigation);
