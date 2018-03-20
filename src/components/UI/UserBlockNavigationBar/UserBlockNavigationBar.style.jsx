import styled from 'styled-components';
import media from 'theme/media';

export const NavigationBar = styled.div`
    display: flex;
    justify-content: space-around;
    box-shadow: 0 2px 3px gray;
    padding: 2%;
    width: 96%;
    margin-bottom: 60px;

    ${media.desktop`
        width: 100%;
        margin-bottom: 0;
    `}

    .fa{
        font-size: 56px;

        &:hover {
            color: red;
            cursor: pointer;
        }
    }
`;