import styled from 'styled-components/native'

const PickupButton = styled.View`
    border-radius: 40;
    border: 2px solid #ffffff;
    width: 150;
    height: 100;
    margin: 2px;
    display: flex;
    justifyContent: center;
    alignItems: center;
    background-color: ${props => props.status === 'empty' ? '#959595' : props.status  === 'reserved' ? '#ffce00' : props.status  === 'full' ? '#6BE545' : '#959595'};
`;

export default PickupButton
