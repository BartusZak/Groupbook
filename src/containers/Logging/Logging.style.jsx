import styled from 'styled-components';
import media from '../../theme/media';

export const LoggingContent = styled.div`
    height: 84vh;
    padding-top: 4vh;
    // background: url('${require('assets/img/test.jpg')}');
    // background-repeat: no-repeat;
    // background-size: cover;

    ${ media.desktop`
        height: unset;
`}
`;

export const LoggingRow = styled.div`
    height: 67%;

    ${ media.desktop`
        height: unset;
`}
`;

export const LoggingRow1 = styled.div`
    height: 25%;

    ${ media.desktop`
    height: unset;
`}
`;

export const LoggingRow2 = styled.div`
    height: 5%;
   
    ${ media.desktop`
    height: unset;
`}
`;