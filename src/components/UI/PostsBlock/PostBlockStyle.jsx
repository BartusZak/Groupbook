import styled from 'styled-components';
export const PostBlockDiv = styled.div`

.post-container{
    margin: 0 auto;
    padding: 10px;
    box-shadow: 0 2px 3px grey;
    width: 96.5%;
    display: flex;
    flex-flow: column;
    background-color: #2c2c36;
    overflow-y: scroll;
    max-height: 420px;
}
.main-post-title{
    font-size: 14px !important;
    padding: 5px;
    box-sizing: border-box;
    font-weight: bolder;
    border-bottom: 1px solid grey;
}
.group-name-title, .main-post-date{
    padding: 0;
    margin: 0;
    color: rgb(146, 197, 114);
}
.main-post-date{
    text-align: right !important;
   
}
.main-post-title-cont{
    margin-bottom: 20px;
}

.single-post{
    display: flex;
    margin: 5px 0;
    width: 100%;
}

.image-holder2{
    display: flex;
    flex-flow: column;
    width: 100%;
    align-items: center;
    
    
}
.image-holder2 img:hover { opacity: 0.9; cursor: pointer;}

.image-holder2 img{
    width: 90%;

}

.main-post-date{
    font-size: 14px;
    text-align: center;
}

.post-title{
    font-size: 12px;
    font-weight: bold;
    text-align: center;
    width: 80%;
}

@media(min-width: 1000px){
    .post-title{ font-size: 15px; padding: 10px; }
    .main-post-date{  font-size: 16px; padding: 10px; }
       
   
}
`;