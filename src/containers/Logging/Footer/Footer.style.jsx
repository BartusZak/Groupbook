import styled from 'styled-components';
import  media  from '../../../theme/media';

export const Footer = styled.div`

ul {
    display: -webkit-inline-box;
    list-style: none;
    margin: 0;
    padding: 0;

    li {
        margin: 0 15px;
    }
}

${ media.desktop`
    li {
        margin-top: 5px;
        font-size: 14px;
    }

`}

${ media.tablet`
    font-size: 10px;
    ul {
        display: unset;

        li {
            margin: 5px 0;
            font-size: 18px;
        }
    }
    
`}




`;