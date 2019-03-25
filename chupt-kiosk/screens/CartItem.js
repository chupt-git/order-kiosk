import React from 'react'
import { Text, View, FlatList } from 'react-native'
import Txt from '../components/Txt'
import CartButtons from './CartButtons'

class CartItem extends React.Component {
    render() {
        let header = ''
        let mods = []
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
                        // dataItem.item.changedMod.forEach(x=> {
                        //     mods.push(x)
                        // })
                        return (
                            <View>
                                <View style={{
                                    marginBottom: 5,
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
                                <Text>{mods}</Text>
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
