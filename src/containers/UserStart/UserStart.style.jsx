import styled from 'styled-components';
import media from 'theme/media';

export const PostsDiv = styled.div`
    ${media.desktop`
        order: 2;
        display: flex;
        align-items: center;
        justify-content: center;
    `}
`;

export const UserBlockDiv = styled.div`
    width: 42%;
    display: -ms-flexbox;
    display: flex;
    margin-left: 4%;
    -ms-flex-flow: column;
    flex-flow: column;
    -ms-flex-align: center;
    align-items: center;
    font-size: 20px;

    ${media.desktop`
        width: 100%;
        margin: 0;
        padding: 0;
        display: unset;
        background: white;
    `}
`;