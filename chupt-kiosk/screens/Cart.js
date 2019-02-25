import React from 'react'
import { View, Text, TouchableOpacity, FlatList, SectionList } from 'react-native'
import styled from 'styled-components/native'
import CartItem from './CartItem'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import TopNavigation from './TopNavigation'
import Body from '../components/Body'
import Txt from '../components/Txt'
import MainWrap from '../components/MainWrap'
import MedText from '../components/MedText'
import CircleButton from '../components/CircleButton'

class Cart extends React.Component {
  constructor( props ) {
    super( props );
  }
  render() {
    let btn = ''
    const obj = []
    let currentCategory = ''
    return (
      <MainWrap>
        <TopNavigation/>
        <Body>
          <View
            style={{
              backgroundColor: '#F7F7F7',
              width: '95%',
              borderRadius: 15,
              flex: 1,
              margin: 20,
              padding: 20

            }}>
            <MedText>Cart</MedText>
            <FlatList
            style={{width: '95%', padding: 20}}
            data={this.props.cart}
            renderItem={(dataItem) => {
              return (
                <CartItem
                  item={dataItem}/>
              )
            }}
            keyExtractor={(item, index) => index.toString()}
            />
          </View>
          <View
            style={{height: 90}}>
          </View>
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

export default connect(mapStateToProps)(Cart);



// <SectionList
// renderItem={({item, index, section}) =>
//   <Text key={index}>{item.name}</Text>
// }
// renderSectionHeader={({section}) => <Text> { section.title } </Text> }
// sections={this.props.cart}
// keyExtractor={(item, index) => item + index}
// />


// <FlatList
// style={{width: '95%', padding: 20}}
// data={this.props.cart}
// renderItem={(dataItem) => {
//   if (currentCategory !== dataItem.item.type) {
//       btn = <Txt bold blue style={{marginBottom: 10}}>{dataItem.item.type.toUpperCase()}:</Txt>
//       currentCategory = dataItem.item.type
//   } else {
//     btn = ''
//   }
//   return (
//     <View style={{borderStyle:'solid', marginBottom: 5}}>
//       <Text>{btn}</Text>
//       <View>
//         <View style={{
//           marginBottom: 5,
//           display: 'flex',
//           flexDirection: 'row',
//           alignItems: 'center',
//           justifyContent: 'space-between'}}>
//           <Txt light>
//             {dataItem.item.name}
//           </Txt>
//           <View style={{
//             display: 'flex',
//             flexDirection: 'row',
//             alignItems: 'center'}}>
//             <CircleButton red
//               onPress={() =>
//                 this.props.removeFromCart(dataItem.item)
//               }>
//               <ColoredText>X</ColoredText>
//             </CircleButton>
//
//             <CircleButton green
//               onPress={() =>
//                 this.props.addToCart(dataItem.item)
//               }>
//               <ColoredText>+</ColoredText>
//             </CircleButton>
//           </View>
//         </View>
//       </View>
//     </View>
//   )
// }}
// keyExtractor={(item, index) => index.toString()}
// />
