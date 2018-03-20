import styled from 'styled-components';
import media from 'theme/media';

export const MessagesBlockDiv = styled.div`

    width: 96%;
    padding: 2%;
    height: 420px;
    box-shadow: 0 2px 3px grey;
    margin: 0 10px;
    -webkit-transition: height 2s; /* For Safari 3.1 to 6.0 */
    transition: height 2s;

    span{
        font-size: 16px;
        color: lightcoral;
        cursor: pointer;
        font-weight: bold;

        &:hover{
            color:lightsalmon;
        }
    }

    .MessagesButtons{
        padding: 10px;
        width: 100%;
        border-bottom: 1px solid grey;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;

        &::-webkit-scrollbar { 
            display: none; 
        }
    }

    .Messages{
        width: 100%;
        height: 350px;
        box-sizing: border-box;
        overflow-y: scroll;
    }

    .Message

`;