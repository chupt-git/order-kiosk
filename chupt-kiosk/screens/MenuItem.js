import React from 'react';
import { Text, View, Button, CheckBox } from 'react-native';
import styled from 'styled-components/native';
import Img from '../components/Img';
import ItemTitle from '../components/ItemTitle';
import ItemWrap from '../components/ItemWrap';
import DescWrap from '../components/DescWrap';
import Txt from '../components/Txt';
import OptionButtons from '../components/OptionButtons';
import CircleButton from '../components/CircleButton';
import MedText from '../components/MedText';
import { bindActionCreators } from 'redux';
import { addToCart } from '../kioskActions';
import { connect } from 'react-redux';

class MenuItem extends React.Component {
  render() {
    return (
      <View style={{width: 350, height: 500, borderStyle:'solid'}}>
        <ItemWrap>
          <Img
            resizeMode={'cover'}
            source={require('../assets/placeholder.jpg')}/>

              <DescWrap>
                <ItemTitle>{this.props.item.name}</ItemTitle>
                <Txt light>{this.props.item.description}</Txt>
              </DescWrap>
              <OptionButtons>
                  <CircleButton
                    green
                    onPress={() =>
                      this.props.addToCart(this.props.item)
                    }>
                    <MedText white>+</MedText>
                  </CircleButton>
                </OptionButtons>
        </ItemWrap>
      </View>
    );
  }
}

function mapStateToProps(state) {
    return {
        cart: state.cart
    }
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    addToCart,
  }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(MenuItem);
