import React from 'react'
import {FlatList, Text, View, CheckBox} from 'react-native'
// import {toggleChecked} from "../kioskActions";
// import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'

class ChoiceMod extends React.Component {
    render() {
        const choices = this.props.data.choice
        const item = this.props.item
        return (
            <View>
                <Text>CHOICES</Text>
                <FlatList
                    data={choices}
                    renderItem={({item}) =>
                        <View>
                            <Text>{item.name}</Text>
                            <CheckBox
                                value={(/true/i).test(item.value)}
                                onValueChange={() => this.setState({ checked: !this.state.checked })}
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
        cart: state.cart
    }
}

// const mapDispatchToProps = dispatch => (
//     bindActionCreators({
//         toggleChecked,
//     }, dispatch)
// )

export default withNavigation(connect(
    mapStateToProps,
    // mapDispatchToProps
)(ChoiceMod))
// export default ChoiceMod