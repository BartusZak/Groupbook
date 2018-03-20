import styled from 'styled-components';
import media from 'theme/media';

export const SpinnerDiv = styled.div`
    padding: 2%;
    display: flex;
    width:100%;

    ${media.desktop`
        flex-direction: column;
    `}
    

    h1{
        margin-left: -50%;
    }

    .Sticky {
        position: fixed;
        top: 0;
        left: 50%;

        ${media.desktop`
            left: 0;
        `}
    
    }
`;