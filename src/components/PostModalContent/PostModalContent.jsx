import React from 'react';
import './PostModalContent.css';
import Meme from '../../assets/img/memeExample/meme.png';

import { ImgDiv } from './PostModalContent.style';
const postModalContent = (props) => {
    return(
        <article className="ModalPost">
            <div className="InformationsAboutPost">
                <h4>{props.name}</h4>
                <span style={{color: 'red'}}>{props.author}</span>
                <span style={{color: 'orange'}}>{props.addDate}</span>
            </div>
            <div className="ModalPostContent">
                <span>
                    <h5>Nazwa grupy </h5>
                    {props.content}
                </span>
                <ImgDiv>
                    <img src={Meme} alt="Meme"></img>
                </ImgDiv>
                
            </div>
         
        </article>

    );
}

export default postModalContent;