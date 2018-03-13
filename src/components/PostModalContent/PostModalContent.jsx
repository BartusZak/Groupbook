import React from 'react';
import './PostModalContent.css';
import Meme from '../../assets/img/memeExample/meme.png';
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
                <img src={Meme} alt="Meme"></img>
            </div>
         
        </article>

    );
}

export default postModalContent;