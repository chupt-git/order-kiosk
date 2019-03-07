import React from 'react'
import {Text, View, FlatList, CheckBox} from 'react-native'
import {toggleChecked} from "../kioskActions";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'

class OptionMod extends React.Component {
    render() {
        const options = this.props.data.option
        const itemID = this.props.item.item.item_id
        console.log(menuItem)
        return (
            <View>
                <Text>OPTIONS</Text>
                <FlatList
                    data={options}
                    renderItem={({item}) =>
                        <View>
                            <Text>{item.name}</Text>
                            <CheckBox
                                value={(/true/i).test(item.value)}
                                onChange={() => this.props.toggleChecked(item.name, itemID)}
                            />
                        </View>}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        cart: state.cart,
        checked: state.checked
    }
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        toggleChecked,
    }, dispatch)
)

export default withNavigation(connect(
    mapStateToProps,
    mapDispatchToProps
)(OptionMod))

// export default OptionMod

// <FlatList
// contentContainerStyle={{
//     display:'flex',
//         flexDirection:'row',
//         justifyContent: 'space-between',
//         width: '100%'}}
// data={this.props.data}
// renderItem={({item}) => <Text></Text>}
// keyExtractor={(item, index) => index.toString()}
// />