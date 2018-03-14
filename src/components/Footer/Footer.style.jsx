import styled from 'styled-components';
import media from 'theme/media';

export const FooterContainer = styled.div`
    width: 100%;    
`;

export const FooterMain = styled.div`
    width: 100%;
    background: #000000;
    padding: 50px 0 80px;
    text-align: left;

    h4 {
        color: dimgray;
    }

    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    .contact {
        text-transform: none;
    }
    .contact li {
        margin-bottom: 10px;
    }
    ${media.phone`
        text-align: center;
        padding: 20px 0;

        .col-md-3 {
            padding: 20px 0;
        }
        .container .row div:first-child {
            display: none;
        }
    `}
`;

export const AfterFooter = styled.div`
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    background: #212925;
    color: white;
    text-align: center;

    p {
        display: block;
        margin: auto;
        font-size: 10px;
    }
`;