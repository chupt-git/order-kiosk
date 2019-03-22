import React from 'react'
import {FlatList, Text, View} from 'react-native'
import {toggleChecked} from "../kioskActions"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import MenuItemWrap from "../components/MenuItemWrap"
import Body from '../components/Body'
import TopNavigation from './TopNavigation'
import BottomNavigation from './BottomNavigation'
import MenuItem from './MenuItem'
import MainWrap from '../components/MainWrap'

class SideChange extends React.Component {
    render() {
        const items = this.props.menu.products
        const mealId = this.props.navigation.state.params.mealId

        let currentProducts = []

        Object.keys(items).forEach(function(key) {
            if (key === 'sides') {
                currentProducts = items[key]
            }})

        return (
            <MainWrap>
                <TopNavigation/>
                    <Body>
                    <MenuItemWrap style={{
                        flexDirection: 'row',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        paddingTop: 50,
                        minHeight: 300,
                        marginTop: 100
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
                                        mealId={mealId}
                                    />
                                )}}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </MenuItemWrap>
                </Body>
                <BottomNavigation/>
            </MainWrap>
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