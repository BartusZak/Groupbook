import styled from 'styled-components';

export const LoaderDiv = styled.div`
    .loader {
        border: 16px solid white;
        position: absolute;
        border-radius: 50%;
        border-top: 16px solid black;
        -webkit-animation: spin 2s linear infinite; /* Safari */
        animation: spin 1s linear infinite;
    }
    
    /* Safari */
    @-webkit-keyframes spin {
        0% { -webkit-transform: rotate(0deg); }
        100% { -webkit-transform: rotate(360deg); }
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
   
`;


