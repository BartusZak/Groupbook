import styled from 'styled-components';
export const PostBlockDiv = styled.div`
.post-container{
    margin: 0 auto;
    padding: 10px;
    box-shadow: 0 2px 3px grey;
    width: 96.5%;
    display: flex;
    flex-flow: column;
    overflow-y: scroll;
    max-height: 420px;
}
.main-post-title{
    font-size: 15px !important;
    padding: 10px;
    box-sizing: border-box;
    font-weight: bolder;
    border-bottom: 1px solid grey;
}
.main-post-title-cont{
    box-shadow: 0 2px 3px grey;
    margin-bottom: 20px;
}

.single-post{
    display: flex;
    margin: 5px 0;
    width: 100%;
}
.group-name-title{
    padding: 0 10px;
    margin: 0;
    font-size: 18px;
    color: green;
    font-weight: bold;
    align-items: center;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid grey;
}
.more-post{
    font-size: 15px;
    color: rgb(190, 48, 23);
    cursor: pointer;
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
}

.post-title{
    font-size: 12px;
    font-weight: bold;
    text-align: center;
    width: 80%;
}

@media(min-width: 1400px){
    .post-title{ font-size: 15px; }
    .main-post-date{  font-size: 16px; }
       
   
}


`;