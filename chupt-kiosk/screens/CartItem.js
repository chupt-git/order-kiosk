import React from 'react'
import { Text, View, FlatList } from 'react-native'
import Txt from '../components/Txt'
import CartButtons from './CartButtons'

class CartItem extends React.Component {
    render() {
        let header = ''
        if (this.props.item.item.items.length) {
            header = <Txt bold blue style={{marginBottom: 10}}>{this.props.item.item.type.toUpperCase()}:</Txt>
        }
        return (
            <View>
                <Text>{header}</Text>
                <FlatList
                    style={{padding: 10}}
                    data={this.props.item.item.items}
                    renderItem={(dataItem) => {
                        let mods = []
                        dataItem.item.changedMod.forEach((x, y)=> {
                            mods.push(
                                <Text
                                    style={{color: '#EF7A6B', marginBottom: 2}}
                                    key={x + y}>
                                    - {x}
                                </Text>
                            )
                        })
                        return (
                            <View style={{
                                marginBottom: 5
                            }}>
                                <View style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    width: '95%'
                                }}>
                                    <Txt style={{maxWidth: '50%'}} light>
                                        {dataItem.item.name}
                                    </Txt>
                                    <CartButtons
                                        item={dataItem}/>
                                </View>
                                <View style={{marginLeft: 10}}>{mods}</View>
                            </View>
                        )
                    }}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }
}

export default CartItem
