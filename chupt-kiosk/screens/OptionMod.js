import React from 'react'
import {Text, View, FlatList, CheckBox} from 'react-native'
import {toggleChecked} from "../kioskActions"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'

class OptionMod extends React.Component {

    render() {
        const options = this.props.data.option
        const itemID = this.props.item.item.item_id
        const checked = this.props.checked.find(x=> x==itemID)
        // const inChecked = checked.find(x => x.id === itemID)
        return (
            <View>
                <Text>OPTIONS</Text>
                <FlatList
                    data={options}
                    renderItem={({item}) =>
                        <View>
                            <Text>{item.name}</Text>
                            <CheckBox
                                checked={true}
                                onValueChange={() => this.props.toggleChecked(item.name, itemID)}
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
        menu: state.menu,
        checked: state.checked
    }
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        toggleChecked
    }, dispatch)
);

export default withNavigation(connect(
    mapStateToProps,
    mapDispatchToProps
)(OptionMod))


// this.props.checked.itemID


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