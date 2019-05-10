import React from 'react'
import { View, Image } from 'react-native'
import ProductImage from '../components/ProductImage'

class MenuImage extends React.Component {
  render () {
    const item = this.props.item
    let images = []

    if (item.items) {
      item.items.forEach((x, y) => {
        x.images.forEach((x) => {
          images.push(
            <ProductImage
              key={item.item_id + y}
              number={y}
              style={{ left: -y * 35, top: -y * 10 }}
              source={{ uri: x.image_url }}
            />
          )
        })
      })
    }else {
      item.images.forEach((x) => {
        images.push(
          <Image
            key={item.item_id}
            style={{ resizeMode: 'contain', width: 200, height: 200 }}
            source={{ uri: x.image_url }}/>
        )
      })
    }
    return (
      <View>
        {images}
      </View>
    )
  }
}

export default MenuImage
