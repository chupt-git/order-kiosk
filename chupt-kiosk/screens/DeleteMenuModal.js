import React from 'react'
import MainButton from '../components/MainButton'
import ColoredText from '../components/ColoredText'
import { Text, Modal, View } from 'react-native'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import {bindActionCreators} from "redux";
import {toggleModalDisplay, quickDeleteCart} from "../kioskActions";

class BottomNavigation extends React.Component {
    render() {
        return (
            <Modal
                visible={ this.props.display }
                animationType = "slide"
                onRequestClose={ () => console.log('closed') }
                transparent={true}>
                <View
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#33333363',
                        height: '100%'}}>
                    <View
                        style={{
                            width: '60%',
                            backgroundColor: '#fff',
                            borderRadius: 20,
                            padding: 20}}>
                        <Text>
                            It looks like you're trying to delete your order.
                            This will remove all items in your cart.
                        </Text>
                        <Text>Are you sur you want to do this?</Text>

                        <MainButton blue fullWidth onPress={() =>{
                            this.props.toggleModalDisplay()
                            this.props.quickDeleteCart()
                        }}>
                            <ColoredText style={{width: '100%'}}>I'm sure, clear my cart</ColoredText>
                        </MainButton>
                        <MainButton blue fullWidth onPress={() =>{
                            this.props.toggleModalDisplay()
                        }}>
                            <ColoredText style={{width: '100%'}}>No thanks, keep my cart</ColoredText>
                        </MainButton>
                    </View>
                </View>
            </Modal>
        )
    }
}

function mapStateToProps(state) {
    return {
        display: state.display
    }
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        toggleModalDisplay,
        quickDeleteCart
    }, dispatch)
)

export default withNavigation(connect(
    mapStateToProps,
    mapDispatchToProps
)(BottomNavigation))