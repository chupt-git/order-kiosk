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
        const checked = this.props.checked.filter(x=> x.id === itemID)


        if (!checked) {
            return null
        } else {
            if (!checked.item) {
                // console.log(checked.item)
                const mealObj = this.props.checked.find(x => x.item[0].id === this.props.item.item.item_id)

                console.log(mealObj)
                return (
                    <View>
                        <Text>OPTIONS</Text>
                        <FlatList
                            data={options}
                            extraData={checked}
                            renderItem={({item}) => {
                                console.log(item)
                                return(
                                    <View>
                                        <Text>{item.name}</Text>

                                    </View>)
                            }}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                )
            } else {

                return (
                    <View>
                        <Text>OPTIONS</Text>
                        <FlatList
                            data={mealObj.item[0].options}
                            extraData={checked}
                            renderItem={({item}) => {
                                // console.log("++++++++++++")
                                // console.log(mealObj.item)
                                // console.log(item)
                                // console.log(checked.item[0].options.find(x => x.name == item.name))
                                // const test = checked.item[0].options.find(x => x.name == item.name).value
                                // console.log(test)
                                return(
                                    <View>
                                        <Text>{item.name}</Text>

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