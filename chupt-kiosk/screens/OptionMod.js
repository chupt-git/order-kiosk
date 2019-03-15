import React from 'react'
import {Text, View, FlatList, CheckBox} from 'react-native'
import {toggleChecked} from "../kioskActions"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'

class OptionMod extends React.Component {
    render() {
        const options = this.props.data.option
        const itemID = this.props.id
        const checked = this.props.checked.filter(x=> x.id == itemID)

        if (!checked.length) {
            return null
        } else {
            switch (this.props.mealType) {
                case 'single':
                    return (
                        <View>
                            <Text>OPTIONS</Text>
                            <FlatList
                                data={options}
                                extraData={checked}
                                renderItem={({item}) => {
                                    return(
                                        <View>
                                            <Text>{item.name}</Text>
                                            <CheckBox
                                                value={(/true/i).test(checked[0].options.find(x => x.name === item.name).value)}
                                                onValueChange={() => this.props.toggleChecked(itemID, 'options', item.name )}
                                            />
                                        </View>)
                                }}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                    )
                case 'multi':
                    const multiItem =checked.find(x => x.item[0].id === this.props.item.item.item_id)

                    return (
                        <View>
                            <Text>OPTIONS MULTI</Text>
                            <FlatList
                                data={options}
                                extraData={checked}
                                renderItem={({item}) => {
                                    return(
                                        <View>
                                            <Text>{item.name}</Text>
                                            <CheckBox
                                                value={(/true/i).test(multiItem.item[0].options.find(x => x.name === item.name).value)}
                                                onValueChange={() => this.props.toggleChecked(itemID, 'options', item.name )}
                                            />
                                        </View>)
                                }}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                    )
            }
        }
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
)

export default withNavigation(connect(
    mapStateToProps,
    mapDispatchToProps
)(OptionMod))