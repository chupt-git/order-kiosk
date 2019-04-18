import React from 'react'
import { LinearGradient } from 'expo'
import MainButton from '../components/MainButton'
import Cart from './Cart'
import ColoredText from '../components/ColoredText'
import CircleButton from '../components/CircleButton'
import {View, Animated} from 'react-native'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import {bindActionCreators} from "redux";
import {changePickupTypeInput, removePopup, toggleModalDisplay} from "../kioskActions";

class BottomNavigation extends React.Component {

    constructor () {
        super()
        this.springValue = new Animated.Value(120)
    }

    spring () {
        this.springValue.setValue(120)
        Animated.timing(
            this.springValue,
            {
                toValue: -5,
                friction: 0.5,
                duration: 500,
                delay: 2000
            }
        ).start(() => {
            let s = JSON.stringify(this.springValue)
            if (s === '-5') {
                this.props.removePopup()
            }
        })
    }

    render() {
        let popup = []
        if (this.props.showPopup) {
            this.spring()
            popup.push(
                <Animated.View key={'popup'} style={{
                    padding: 30,
                    backgroundColor: '#efeded',
                    width: 335,
                    alignSelf: 'flex-end',
                    right: 25,
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                    position: 'absolute',
                    bottom: this.springValue
                }}>
                <ColoredText med blue>Item added to cart!</ColoredText>
            </Animated.View>
            )
        } else {
            popup = []
        }

        let populated = true

        for (let x of this.props.cart) {
            if (x.items.length) {
                populated = false
                break;
            } else {
                populated = true
            }
        }

        return (
            <View style={{width: '100%'}}>
                {popup}
                <View style={{height: 30, width: '100%', backgroundColor: '#efeded'}}/>
                <View style={{
                    height: 90,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#e8e8e8'
                }}>
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '95%',
                            position: 'relative',
                            zIndex: 2
                        }}>
                        <CircleButton
                            disabled={populated}
                            onPress={() =>
                                this.props.toggleModalDisplay()
                            }>
                            <ColoredText disabled={populated}>X</ColoredText>
                        </CircleButton>
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row'
                            }}>
                            <MainButton
                                noBorder
                                smallWidth
                                disabled={populated}
                                onPress={() => this.props.navigation.navigate('Cart')}>
                                <ColoredText disabled={populated}>Cart</ColoredText>
                            </MainButton>
                            <MainButton
                                style={{marginRight: 10, marginLeft: 10,}}
                                noBorder
                                smallWidth
                                disabled={populated}
                                onPress={() => this.props.navigation.navigate('Checkout')}>
                                <ColoredText disabled={populated}>Checkout</ColoredText>
                            </MainButton>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        cart: state.cart,
        showPopup: state.showPopup
    }
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        toggleModalDisplay,
        removePopup
    }, dispatch)
)

export default withNavigation(connect(
    mapStateToProps,
    mapDispatchToProps
)(BottomNavigation))
