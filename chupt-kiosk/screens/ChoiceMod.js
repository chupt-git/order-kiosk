import React from 'react'
import {FlatList, Text, View, CheckBox} from 'react-native'
import {toggleChecked} from "../kioskActions";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'

class ChoiceMod extends React.Component {
    render() {
        const choices = this.props.data.choice
        const itemID = this.props.id
        const choiceGuts =[]
        const checked = this.props.checked.find(x => x.id === itemID)

        if (checked) {
            switch (this.props.mealType) {
                case 'single':
                    choices.forEach((x, y) => {
                        choiceGuts.push(
                            <View key={x.description + y}>
                                <Text>{x.name}</Text>
                                <FlatList
                                    data={x.choices}
                                    extraData={checked}
                                    renderItem={ (item) =>
                                        <View>
                                            <Text>{item.item.name}</Text>
                                            <CheckBox
                                                value={checked.choices[y].value.includes(item.item.name.toLowerCase())}
                                                onValueChange={() => this.props.toggleChecked(itemID, 'choices', x.name, item.item.name )}
                                            />
                                        </View>
                                    }
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            </View>
                        )
                    })
                    break
                case 'multi':
                    const multiItem = checked.items.find(x => x.id === this.props.item.item.item_id)
                    if (multiItem.choices.length){
                        multiItem.choices.forEach((x, y) => {
                            choiceGuts.push(
                                <View key={x.description + y}>
                                    <Text>{x.name}</Text>
                                    <FlatList
                                        data={x.choices}
                                        extraData={checked}
                                        renderItem={ ({item}) =>{
                                            return(
                                            <View>
                                                <Text>{item.name}</Text>
                                                <CheckBox
                                                value={multiItem.choices[y].value.includes(item.name.toLowerCase())}
                                                onValueChange={() => this.props.toggleChecked(itemID, x.name, 'choices', multiItem.id, item.name )}
                                            />
                                            </View>)
                                        }}
                                        keyExtractor={(item, index) => index.toString()}
                                    />
                                </View>
                            )
                    })}
                    break

            }
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