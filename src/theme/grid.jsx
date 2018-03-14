import styled from 'styled-components';
import media from 'theme/media';

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    padding: 100px 150px 0;
    ${media.phone`
        padding: 15px 10px 0;
    `}
`;