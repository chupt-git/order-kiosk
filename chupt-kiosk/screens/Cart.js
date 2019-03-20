import React from 'react'
import { View, FlatList } from 'react-native'
import CartItem from './CartItem'
import { connect } from 'react-redux'
import TopNavigation from './TopNavigation'
import Body from '../components/Body'
import MainWrap from '../components/MainWrap'
import MedText from '../components/MedText'
import CartNavigation from './CartNavigation'

class Cart extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
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
                        style={{width: '100%', padding: 20}}
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
                <CartNavigation/>
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

export default connect(mapStateToProps)(Cart)
