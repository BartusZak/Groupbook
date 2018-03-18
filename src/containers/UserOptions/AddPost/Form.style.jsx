import styled from 'styled-components';
import ValidationBubbleImg from '../../../assets/img/validation/validationBubble.png';
export const ValidationBubble = styled.span`
    position: absolute;
    right: calc(70px);
    width: 200px;
    height: 58px;
    font-size: 12px;
    background: url(${ValidationBubbleImg}) no-repeat center; 
    background-size: cover;
    margin: 20px;

    span {
        padding: 9px;
        display: inline-block;
        color: white;
        text-shadow: 1px 1px 1px black;
    }
`;