import React from 'react'
import { View, Text } from 'react-native'
import MainWrap from '../components/MainWrap'
import TopNavigation from './TopNavigation'
import BottomNavigation from './BottomNavigation'
import Body from '../components/Body'
import ItemTitle from '../components/ItemTitle'
import CircleButton from '../components/CircleButton'
import ColoredText from '../components/ColoredText'
import MenuItemWrap from '../components/MenuItemWrap'
import MenuImage from './MenuImage'
import ChoiceMod from './ChoiceMod'
import OptionMod from './OptionMod'
import { addToCart, populateMods } from '../kioskActions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class ModifyItem extends React.Component {
    componentWillMount () {
        this.props.populateMods(this.props.navigation.state.params.item)
    }
  render() {
    const item = this.props.navigation.state.params.item
    const option = []
    const choice = []
    const modGuts = []

    item.mods.forEach((x, y)=>{
        switch (x.mod_type) {
            case 'option':
                option.push(x);
                if(option.length <= 1){
                    modGuts.push(
                        <OptionMod key={'option'} data={{option}} item={{item}}/>
                    )
                }
                break;
            case 'choice':
                choice.push(x);
                if(choice.length <= 1){
                    modGuts.push(
                        <ChoiceMod key={'choice'} data={{choice}} item={{item}}/>
                    )
                }
        }
    })

    return (
      <MainWrap>
        <TopNavigation/>

        <Body style={{height:'100%', justifyContent: 'space-between'}}>
          <MenuItemWrap style={{
            height:'80%',
            alignItems: 'flex-start',
            flexDirection: 'column'}}>
            <View style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start'}}>
              <MenuImage style={{width: '50%'}} item={item}/>
              <View style={{width: '50%'}}>
                <ItemTitle>{item.name}</ItemTitle>
                <Text>{item.description}</Text>
              </View>
            </View>

          <View style={{width: '100%'}}>
            {modGuts}
          </View>

            <View
              style={{
                position: 'absolute',
                bottom: -25,
                left: 20,
                display:'flex',
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'center',
              }}>

              <CircleButton onPress={() => {
                this.props.addToCart(item)
                this.props.navigation.navigate('MenuPicker')}}>
                <ColoredText>+</ColoredText>
              </CircleButton>
            </View>
          </MenuItemWrap>
          <BottomNavigation/>
        </Body>
      </MainWrap>
    )
  }
}

function mapStateToProps(state) {
    return {
        cart: state.cart
    }
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        addToCart,
        populateMods
    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps) (ModifyItem)


