import styled from 'styled-components';
import media from 'theme/media';

export const SelectGroup = styled.div`
    box-sizing: border-box;
    box-shadow: 1px 2px 3px gray;
    text-align: center; 
    padding: 20px 40px;
    height: 100%;
    
    .Buttons{
        font-size: 25px;
        i {
            margin: 0 20px 0 20px;
            cursor: pointer;
        }

        span {
            margin: 0 20px 0 20px;
            font-style: italic;
        }

        .Numbers{
            font-weight: bold;
            color: green;
        }
        .EmptyNumber{
            color: red !important;
        }
    }
    
    .unSelectAllIcons,
    .selectAllIcons {
        height: 1em;
        width: 1em;
        position: relative;
        display: inline-block;
        margin: 0 20px 0 20px;

        i {
           
        }
    }

    .AddPostButton{
        background-color: #f44336;
        border: none;
        font-size: 20px;
        color: white;
        cursor: pointer;
        padding: 20px;

        &:hover{
            background-color: #f33225;
        }
    
        &:disabled{
            background-color: grey;

            &:hover{
                background-color: #9E9E9E;
            }
        }   
    }

    .PlaceForGroupItems{
        overflow-y: auto;
        overflow-x: hidden;
        list-style: none;
        font-size: 20px;
        margin: 15px 0;
        height: 300px;
        padding: 0;

        h3 {
            margin-top: 80px;
        }

        .GroupItem{
            cursor: pointer;
            font-weight: bold;
            letter-spacing: 0.5px;
            display: flex;
            justify-content: space-between;
            padding: 5px;
            box-sizing: border-box;
            align-items: center;
            text-align: left;

            &:hover{
                background-color: wheat;
            }

            i{
                font-size: 35px;
                color: green;
                transition: 0.3s transform linear;

                &:hover{
                    transform: scale(1.2);
                    transition: 0.3s transform linear;   
                }
            }
        }
    }

    ${media.giant`
        h2 {
            font-size: 1.5rem;
        }
    `}

    ${media.desktop`
    margin: 50px;
    `}

    ${media.tablet`
    margin: 20px;

    .Buttons {
        font-size: 20px;
    }
    `}

    ${media.phone`
    margin: 5px;

    .Buttons {
        font-size: 15px;
    }
    `}

`;

export const MainForm = styled.div`
    padding: 20px 45px;
    text-align: center;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
    height: 100%;

    textarea,
    input{
        outline: 0;
        background: #f2f2f2;
        width: 100%;
        border: 0;
        padding: 15px;
        box-sizing: border-box;
        font-size: 16px;
        margin-bottom: 15px;
    }

    textarea {
        height: 200px;
    }

    ${media.giant`
        h2 {
            font-size: 1.5rem;
        }
        span {
            font-size: 13px;
        }
    `}

    ${media.desktop`
    margin: 50px;
    `}

    ${media.tablet`
    margin: 20px;
    `}

    ${media.phone`
    margin: 5px;
    `}

`;