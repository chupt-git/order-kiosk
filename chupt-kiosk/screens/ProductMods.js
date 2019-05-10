import React from 'react'
import { View } from 'react-native'

class ProductMods extends React.Component {
  render () {
    const option = []
    const choice = []

    item.mods.forEach((x) => {
      switch (x.mod_type) {
        case 'option':
          option.push(x)
          break
        case 'choice':
          choice.push(x)
      }
    })
    return (
      <View>
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around' }}>
          {choice}
        </View>
        {option}
      </View>
    )
  }
}

export default ProductMods
