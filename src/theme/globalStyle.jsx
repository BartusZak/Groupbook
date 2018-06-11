import {injectGlobal} from 'styled-components';
import media from './media';

/* eslint-disable */
injectGlobal `
    @import url('https://fonts.googleapis.com/css?family=Roboto');
    @import url('https://fonts.googleapis.com/css?family=Quicksand');

    font-family: 'Quicksand', sans-serif;
    
    .modal-bartuszak{
        width: 100%;
        height: 60%;
        background-color: #32323f;
        border-radius: 5px;
        display: flex;
        flex-flow: column;
        align-items: center;
        position: relative;
        justify-content: center;
        text-align: center;
    }


    .kupa {
        font-family: 'Roboto', sans-serif;
        font-size: 24px;
    }

    .fa-facebook-square {
        color: white;
        &:hover {
            color: #3B5998;
            transition: background 0.2s, color 0.4s;
        }
    }
    
    .fa-twitter-square {
        color: white;
        &:hover {
            color: #00aced;
            transition: background 0.2s, color 0.4s;
        }
    }

    ${media.desktop`
        .SpaceForDesktop {
            padding-top: 20px;
        }
        `}

    .whiteSpinner {
        color: #2c2c36 !important;
        &:before,
        &:after{
            background: #ffffff !important;
        }
    }
`;