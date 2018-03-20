import styled from 'styled-components';
import media from 'theme/media';

export const Error404 = styled.div`
    background: url('${require('../../assets/img/404/404.jpg')}');
    background-repeat: no-repeat;
    width: 100%;
    height: 85vh;
    background-size: cover;
    /* background-position: center; */
    padding-top: 100px;

    .jumbotron {
        width: 50%;
    }

    ${media.desktop`
        h1 {
            font-size: 4rem;
        }
    `}

    ${media.desktop`
    height: 90vh;
    h1 {
        font-size: 3.5rem;
    }
    .jumbotron {
        width: 80%;
    }
    `}

    ${media.phone`

    .jumbotron {
        width: 100%;
        text-align: center;
    }
    `}
`;