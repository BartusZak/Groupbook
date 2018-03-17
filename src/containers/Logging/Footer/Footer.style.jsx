import styled from 'styled-components';
import  media  from '../../../theme/media';

export const Footer = styled.div`

ul {
    display: -webkit-inline-box;
    list-style: none;
    margin: 0;
    padding: 0;
    
}

${ media.tablet`
    font-size: 10px;
`}

${ media.desktop`
    font-size: 14px;
    margin-top: 5px;
`}


ul li {
    margin: 0 15px;
}
`;