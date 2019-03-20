import React from 'react'
import OptionMod from "./OptionMod"
import ChoiceMod from './ChoiceMod'
import { populateMods } from '../kioskActions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {View} from "react-native"

class ModWrapper extends React.Component {
    componentWillMount () {
        this.props.populateMods(this.props.item.item, this.props.mealType, this.props.productID)
    }

    componentDidUpdate() {
        console.log('test')
    }

    render() {
        const item = this.props.item.item
        let option = []
        let choice = []
        let modGuts = []

        item.mods.forEach((x)=>{
            switch (x.mod_type) {
                case 'option':
                    option.push(x)
                    if (option.length <= 1){
                        modGuts.push(
                            <OptionMod
                                key={'option'}
                                data={{option}}
                                item={{item}}
                                id={this.props.productID}
                                mealType={this.props.mealType}/>
                        )
                    }
                    break
                case 'choice':
                    choice.push(x)
                    if (choice.length <= 1){
                        modGuts.push(
                            <ChoiceMod
                                key={'choice'}
                                data={{choice}}
                                item={{item}}
                                id={this.props.productID}
                                mealType={this.props.mealType}/>
                        )
                    }
                    break
            }
        })
        return (
            <View style={{width: '100%'}}>
                {modGuts}
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        cart: state.cart
    }
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        populateMods
    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps) (ModWrapper)


