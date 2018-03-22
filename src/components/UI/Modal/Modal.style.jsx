import styled from 'styled-components';
export const ModalBlockDiv = styled.div`
    .Modal{
        position: fixed;
        z-index: 500;
        max-height: 98%;
        background-color: white;
        width: 90%;
        border: 1px solid #ccc;
        box-shadow: 1px 1px 1px black;
        padding: 16px;
        left: 5%;
        top: 1%;
        display: flex;
        box-sizing: border-box;
        transition: all 0.3s ease-out;
        text-align: center;
    }
`;