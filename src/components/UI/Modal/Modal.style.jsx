import styled from 'styled-components';
import media from 'theme/media';

export const ModalDiv = styled.div`
    position: fixed;
    z-index: 500;
    border: 1px solid #ccc;
    box-shadow: 1px 1px 1px black;
    background: white;
    padding: 10px 50px;
    margin: auto 5%;
    width: 90%;
    top: 0.5%;
    left: 0;
    box-sizing: border-box;
    transition: all 0.3s ease-out;
    text-align: center;


    .closeIcon{
        position: absolute;
        right: 1%;
        top: 1%;
        cursor: pointer;
        font-size: 32px;
    }
    .closeIcon:hover{
        color: red;
    }
`;