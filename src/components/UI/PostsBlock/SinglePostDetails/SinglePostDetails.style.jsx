import styled from 'styled-components';


export const Post = styled.div`
    width: 97%;
    text-align: left;
    hr {
        border-top: 1px solid rgba(255,255,255,.1);
        margin-top: 0;
    }
      
    .creation-date{
        opacity: 0.5;
        font-size: smaller;
    }

    .post-single-comment {
        display: flex;
        padding: 10px;
        background-color: rgba(0,0,0,0.2);
        border-radius: 15px;
        margin: 10px 0;
        flex-direction: column;

        .comment-username{
            font-size: smaller;
            width: 50%;
        }

        .creation-date {
            text-align: right;
            width: 50%;
        }
        .comment-username-date {
            display: flex;
            flex-wrap: wrap;
            align-content: space-between;
        }
    }
`;