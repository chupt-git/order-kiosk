import React from 'react'
import {FlatList, Text, View} from 'react-native'
import {toggleChecked} from "../kioskActions"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import MenuItemWrap from "../components/MenuItemWrap"
import MenuItem from './MenuItem'
import ItemTitle from '../components/ItemTitle'

class SideChange extends React.Component {
    render() {
        // const item = this.props.navigation.state.params.item.find(x => x.item_type.toLowerCase() === 'side')

        const items = this.props.menu.products
        // const items = this.props.navigation.state.params.item

        let currentProducts = []

        Object.keys(items).forEach(function(key) {
            if (key === 'sides') {
                currentProducts = items[key]
            }})

        console.log(currentProducts)
        return (
            <View>
                <MenuItemWrap style={{
                    flexDirection: 'row',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    paddingTop: 50,
                    minHeight: 300
                }}>
                    <FlatList
                        contentContainerStyle={{flexGrow: 1}}
                        style={{width: '95%'}}
                        data={currentProducts}
                        renderItem={({item}) => {
                            return (
                                <MenuItem
                                    item={item}
                                    type={'sides'}
                                    addSides={true}
                                />
                            )}}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </MenuItemWrap>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        menu: state.menu
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
)(SideChange))


// <MenuImage style={{width: '50%'}} item={item}/>