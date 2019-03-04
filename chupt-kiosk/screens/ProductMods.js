import React from 'react'
import { View, Text } from 'react-native'
import styled from 'styled-components/native'
import MainWrap from '../components/MainWrap'
import ProductImage from '../components/ProductImage'


class ProductMods extends React.Component {
  render() {
    const type = this.props.item.item
    let test =[]
    switch(type.mod_type) {
      case 'choice':
          type.choices.forEach((x)=>{
            test.push(
              <View>
                <Text>{x.name}</Text>
                <CheckBox />
              </View>)
          })
        break;
      case 'option':
          // console.log(type)
        break;
      default:
    }
    return (
      <Text>
        HELLO
      </Text>
    )
  }
}

export default ProductMods
