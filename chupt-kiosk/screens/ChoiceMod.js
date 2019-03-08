import React from 'react'
import {FlatList, Text, View, CheckBox} from 'react-native'
import {toggleChecked} from "../kioskActions";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'

class ChoiceMod extends React.Component {
    render() {
        const choices = this.props.data.choice
        const itemID = this.props.item.item.item_id
        const choiceGuts =[]
        const inChecked = this.props.checked.find(x => x.id === itemID)
        if (!inChecked) {
            return null
        }else {
            choices.forEach((x, y) => {
                choiceGuts.push(
                    <View key={x.description + y}>
                        <Text>{x.name}</Text>
                        <FlatList
                            data={x.choices}
                            extraData={inChecked}
                            renderItem={ (item) =>
                                <View>
                                    <Text>{item.item.name}</Text>
                                    <CheckBox
                                        value={inChecked.choices[y].value.includes(item.item.name.toLowerCase())}
                                        onValueChange={() => this.props.toggleChecked(itemID, 'choices', x.name, item.item.name )}
                                    />
                                </View>
                            }
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                )
            })
        }
        return (
            <View>
                <Text>CHOICES</Text>
                {choiceGuts}
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
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
)(ChoiceMod))
// export default ChoiceMod