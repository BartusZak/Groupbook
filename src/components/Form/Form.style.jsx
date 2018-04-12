import styled from 'styled-components';
import ValidationBubbleImg from '../../assets/img/validation/validationBubble.png';
import media from 'theme/media';

export const MainForm = styled.form`
    min-height: 800px;
    position: relative;
    z-index: 1;
    background: #FFFFFF;
    max-width: 360px;
    margin: 0 auto;
    padding: 45px;
    text-align: center;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
    p {
        transition: 1s all ease-in-out;
    }
    .loging-error{
        color: orangered;
        font-size: 22px;
        margin-top: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        
    }
    .loging-error::before{
        content: '!';
        padding: 0 10px 0 10px;
        font-size: 26px;
        font-weight: bold;
    }
    select {
        font-family: "Roboto", sans-serif;
        outline: 0;
        background: #f2f2f2;
        margin: 0 0 15px;

        option {
            font-family: "Roboto", sans-serif;
            background: #f2f2f2;
        }
    }

    input {
        font-family: "Roboto", sans-serif;
        outline: 0;
        background: #f2f2f2;
        width: 100%;
        border: 0;
        margin: 0 0 15px;
        padding: 15px;
        box-sizing: border-box;
        font-size: 14px;
        text-transform: lowercase;
      }

      button {
        font-family: "Roboto", sans-serif;
        text-transform: uppercase;
        outline: 0;
        background: #4CAF50;
        width: 100%;
        border: 0;
        padding: 15px;
        margin: 0;
        color: #FFFFFF;
        font-size: 14px;
        -webkit-transition: all 0.3 ease;
        transition: all 0.3 ease;
        cursor: pointer;
        &:hover, :active, :focus {
            background: #43A047;
        }
      }

      .message {
        margin: 15px 0 0;
        color: #b3b3b3;
        font-size: 12px;

        a {
            color: #4CAF50;
            text-decoration: none;
        }
      }
      .invalid{
          border: 1px solid red;
          background-color: #FDA49A;
      }
      .ValidationError {
        color: red;
        margin: 0;
    } 
`;

export const ValidationBubble = styled.span`
    position: absolute;
    right: 306px;
    width: 200px;
    height: 58px;
    font-size: 12px;
    background: url(${ValidationBubbleImg}) no-repeat center; 
    background-size: cover;
    margin-top: -20px;

    span {
        padding: 9px;
        display: inline-block;
        color: white;
        text-shadow: 1px 1px 1px black;
    }

    ${media.phone`
        position: relative;
        right: unset;
        width: unset;
        height: unset;
        font-size: 12px;
        background: unset; 
        margin-top: unset;
        
        span {
            color: red;
            text-shadow: unset;
            padding: 0;
            font-size: 15px;
        }
    `}
`;