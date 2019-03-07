import React from 'react'
import { View, Text, CheckBox } from 'react-native'


class ProductMods extends React.Component {
  render() {
      const option = []
      const choice = []

      item.mods.forEach((x)=>{
          switch (x.mod_type) {
              case 'option':
                  option.push(x);
                  break;
              case 'choice':
                  choice.push(x)
          }
      })
    const modGuts = []


    
    // // switch(type.mod_type) {
    // //   case 'choice':
    // //       type.choices.forEach((x, y)=>{
    // //         choice.push(
    // //           <View key={x + y}>
    // //             <Text>{x.name}</Text>
    // //             <CheckBox value={x.default}/>
    //           {/*</View>)*/}
    //       {/*})*/}
    //     {/*break;*/}
    //   {/*case 'option':*/}
    //       {/*option.push(*/}
    // //         <View key={type.name}>
    // //           <Text>{type.name}</Text>
    // //           <CheckBox value={JSON.parse(type.default.toLowerCase())}/>
    // //         </View>)
    // //     break;
    // //   default:
    // // }
    return (
      <View>
        <View style={{
          display:'flex',
          flexDirection:'row',
          justifyContent: 'space-around'}}>
          {choice}
        </View>
        {option}
      </View>
    )
  }
}

export default ProductMods
