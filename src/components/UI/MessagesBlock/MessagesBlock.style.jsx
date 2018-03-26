import styled from 'styled-components';
import media from 'theme/media';

export const MessagesBlockDiv = styled.div`

    width: 96%;
    height: 420px;
    box-shadow: 0 2px 3px grey;
    margin: 0 auto;
    -webkit-transition: height 2s; /* For Safari 3.1 to 6.0 */
    transition: height 2s;
    background-color: #2c2c36;
    span{
        font-size: 13px;
        color: lightcoral;
        cursor: pointer;
        font-weight: bold;
        margin: 0;
        padding: 0;

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

    @media (min-width: 751px){
        .MessagesButtons span{
            font-size: 12px;
        }
        .MessagesButtons b{
            font-size: 11px;
        }
    }
    @media(max-width: 500px){
        .MessagesButtons b{
            font-size: 15px;
            
        }
    
    }

`;