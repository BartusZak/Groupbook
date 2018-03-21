import styled from 'styled-components';
import ValidationBubbleImg from '../../../assets/img/validation/validationBubble.png';
export const ValidationBubble = styled.span`
    position: absolute;
    right: 461px;
    width: 200px;
    height: 58px;
    font-size: 12px;
    background: url(${ValidationBubbleImg}) no-repeat center; 
    background-size: cover;
    margin-top: 50px;

    span {
        padding: 9px;
        display: inline-block;
        color: white;
        text-shadow: 1px 1px 1px black;
    }
`;