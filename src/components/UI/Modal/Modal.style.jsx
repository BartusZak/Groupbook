import styled from 'styled-components';
import media from 'theme/media';

export const ModalDiv = styled.div`

    position: absolute;
    z-index: 500;
    border: 1px solid #ccc;
    box-shadow: 1px 1px 1px black;
    background: white;
    padding: 10px 30px;
    margin: auto 5%;
    width: 90%;
    min-height: 80%;
    left: 0;
    box-sizing: border-box;
    transition: all 0.3s ease-out;
    text-align: center;
`;