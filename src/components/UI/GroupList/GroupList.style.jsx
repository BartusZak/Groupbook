import styled from 'styled-components';
import media from 'theme/media';

export const GroupList = styled.div`

    .GroupList{
        list-style: none;
        padding: 30px;
        box-sizing: border-box;
        font-size: 28px;
        max-height: 480px;
        display: flex;
        flex-flow: column;
        align-items: center;
        color: #696e9e;
        font-family: 'Bebas neue';
        width: 100%;

        ${media.giant`
            padding: 10px;
        `}

        li {
            margin: 0;
            padding: 0;
            font-weight: bold;
            display: flex;
            justify-content: space-between;
            width: 100%;
            line-height: normal;
            text-align: left;
            margin-bottom: 20px;
        }
    }

    ${media.phone`
        h1 {
            font-size: 20px;
        }
    
        .GroupList {
            padding: 0;
            font-size: 15px;
        }
    `}
`;



