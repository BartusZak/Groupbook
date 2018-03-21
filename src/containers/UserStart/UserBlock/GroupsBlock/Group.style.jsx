import styled from 'styled-components';
import media from 'theme/media';

export const GroupBlockDiv = styled.div`

.main-cont{
    margin: 0 auto;
    width: 96.5%;
    padding: 20px;
    box-sizing: border-box;
    box-shadow: 0 2px 3px grey;
}
.main-cont p{
    font-size: 16px;
    width: 100%;
    height: 32px;
    font-weight: bolder;
    border-bottom: 1px solid grey;
    display: flex;
    padding: 2px;
    box-sizing: border-box;
    position: relative;
    justify-content: space-between;
}
.new-group{
    font-size: 16px;
    color: lightcoral;
    cursor: pointer;
    font-weight: bold;
    display: flex;

    
}
.new-group:hover { color: darksalmon;}
.group-cont{
    padding: 5px;
    height: 110px;
    display: flex;
    margin: 10px 0;
    align-items: center;
    position: relative;
}
.group-cont:hover {
    background-color: rgb(240, 240, 240);
    cursor: pointer;
}
.image-holder{
    border: 6px solid white;
    border-radius: 50%;
    box-sizing: border-box;
    z-index: 10;
}
.image-holder img{

    height: 96px;
    width: 96px;
    border-radius: 50%;
}
.group-desc{
    width: 100%;
    padding: 0 15px;
    font-size: 16px;
    box-sizing: border-box;
    display: flex;
    flex-flow: column;
    height: 100%;
}
.group-desc span { margin: 0; padding: 0;}
.group-title{ font-weight: bolder; }
.group-op{
   font-size: 14px; 
   text-align: justify;
   margin: 0 0 0 10px !important; 
}
.group-desc-after{
    text-align: center;
    margin: auto;
    background-color: rgba(0, 0, 0, 0.8);
    position: absolute;
    width: 0;
    height: 100px;
    -webkit-transition: all 1s; /* Safari */
    transition: all 1s;
}
.group-desc-after div{
    visibility: hidden;
    color: white;
}
.group-additional-info{
    font-size: 17px;
    display: flex;
    justify-content: space-around;
    height: 100%;
    flex-flow: column;
}
.group-additional-info span:first-child{
    box-sizing: border-box;
    border-bottom: 1px solid white;
    text-align: right;
    padding: 0 20px;
}
.group-additional-info span:last-child{
    font-size: 20px;
    text-align: right;
    box-sizing: border-box;
    padding: 0 20px;
}
.fa-info-circle{
    font-size: 24px;
    width: 50px;
   
}
@media(max-width: 1700px){
    .group-op{ font-size: 15px; }
    .group-title{ font-size: 17px; }
    
}


@media(max-width: 1200px){
    .group-op{ font-size: 12px; }
    .group-title{ font-size: 14px; }
    .group-additional-info span:first-child{ font-size: 14px;}
}


@media(max-width: 600px){
    .group-op{ font-size: 12px; }
    .group-title{ font-size: 14px; }
    .group-additional-info span:first-child{ font-size: 12px; }
}

`;