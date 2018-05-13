import React from 'react';
import './SearchPost.css';
import Button from '../../UI/Button/Button';
import moment from 'moment';
const searchPost = props => {
    const dateNow = moment().format();
    const timeFromPostPublish = moment(props.creationDate.slice(0, 10)).fromNow(dateNow);

    return (
    <div className="search-post-block">
        <p className="search-post-date">
        {props.creationDate.slice(0,10)}<b>Opublikowano {timeFromPostPublish} temu</b>
        <i className="fa fa-align-center"></i>
        </p>

        <div className="flex-wrapper">
            <div className="search-post-user-details">
                <header>
                    {props.author !== null ? 
                        <img  
                        src={props.author.profilePicture === null ? props.author.sex ? props.Woman : props.Man : 
                        props.apiPicturesUrl + props.author.profilePicture.profile} 
                        alt="Avatar autora" />
                        : <img src={require('assets/img/404/error-image-generic.png')} alt="Brak usera" />}

                    <span id={props.author ? props.author.id : null} onClick={props.author ? props.redirectToUser : null}>{props.author ? props.author.username : "Tego użytkownika już nie ma"}</span>
                </header>
                
                <article>
                    <p>{props.title}</p>
                    {props.content}
                </article>
            </div>

            <div className="search-post-content">
                {props.pictures.length > 0 ? 
                    <div className="pic-post" 
                    style={{backgroundImage: `url(${
                        props.apiPicturesUrl + props.pictures[0].mediumResolutionPicName
                    })`
                    }}></div>
                : <div>Brak zdjęcia</div>}
                
            </div>
        </div>
        <Button content="Wyświetl szczegóły" />
    </div>
    );
    
};

export default searchPost;