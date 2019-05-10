import React from 'react'
import OptionMod from './OptionMod'
import ChoiceMod from './ChoiceMod'
import { populateMods } from '../kioskActions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { View } from 'react-native'
import MedText from '../components/MedText'

class ModWrapper extends React.Component {
  componentWillMount () {
    this.props.populateMods(this.props.item.item, this.props.mealType, this.props.productID)
  }

  componentDidUpdate () {
    const sideChanged = this.props.moddedSide.find(x => x.item_id === this.props.productID)
    if (sideChanged) {
      sideChanged.items.forEach(x => {
        this.props.populateMods(x, this.props.mealType, this.props.productID)
      })
    }
  }

  render () {
    const item = this.props.item.item
    let option = []
    let choice = []
    let modGuts = []
    const modType = item.item_type.charAt(0).toUpperCase() + item.item_type.slice(1)

    item.mods.forEach((x) => {
      switch (x.mod_type) {
        case 'option':
          option.push(x)
          if (option.length <= 1) {
            modGuts.push(
              <OptionMod
                key={'option'}
                data={{ option }}
                item={{ item }}
                id={this.props.productID}
                mealType={this.props.mealType}/>
            )
          }
          break
        case 'choice':
          choice.push(x)
          if (choice.length <= 1) {
            modGuts.push(
              <ChoiceMod
                key={'choice'}
                data={{ choice }}
                item={{ item }}
                id={this.props.productID}
                mealType={this.props.mealType}/>
            )
          }
          break
      }
    })
    return (
      <View style={{ width: '50%' }}>
        <MedText>{modType} Mods:</MedText>
        <View style={{ marginLeft: 20 }}>
          {modGuts}
        </View>
      </View>
    )
  }
}

function mapStateToProps (state) {
  return {
    cart: state.cart,
    moddedSide: state.moddedSide
  }
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    populateMods
  }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps) (ModWrapper)
