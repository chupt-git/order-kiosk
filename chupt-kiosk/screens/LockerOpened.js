import React from 'react';
import { Text, View, Button, Alert } from 'react-native'
import Home from "./Home"
import MainWrap from '../components/MainWrap'
import HeaderText from '../components/HeaderText'
import ColoredText from '../components/ColoredText'
import MainButton from '../components/MainButton'
import ButtonText from '../components/ButtonText'

class LockerOpened extends React.Component {
    componentDidMount() {
        this.timeoutHandle = setTimeout(()=>{
            this.props.navigation.navigate('Home')
        }, 3000);
    }

    render() {
        return (
            <MainWrap home>
                <View style={{
                    width: '90%',
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <ButtonText>Locker Opened!</ButtonText>
                    <ButtonText style={{marginTop: 50, marginBottom: 50}} small>Enjoy your meal</ButtonText>
                </View>
            </MainWrap>
        )
    }
}

export default LockerOpened