import styled from 'styled-components';
import media from 'theme/media';

export const SearcherDiv = styled.div`

    display: flex;
    margin-left: 5%;
    justify-content: center;
    flex-wrap: wrap;
    flex-direction: column;

    ${media.desktop`
        margin-left: 5%;
    `}

    .InputContent {
        
    }

    .SearcherLabels {
        display: inline-flex;
        margin-top: 10px;
        color: white;

        label {
            margin: 0 10px;
        }
    }
`;