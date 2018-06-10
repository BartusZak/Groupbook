import React from 'react';
import './ChatClient.css';
import Spinner from '../../../components/UI/OwnSpinner/OwnSpinner';
import { apiPicturesUrl } from '../../../axios/apiPicturesUrl';

const chatClient = props => {

    const responseObject = JSON.parse(localStorage.getItem('responseObject'));
    let usersToShow = [];
    for(let key in props.fetchedUsers)
        if(props.fetchedUsers[key].id !== responseObject.id)
            usersToShow.push(props.fetchedUsers[key]);

    
    return (
    <div className="chat-client">
        <i onClick={props.exitChat} className="fa fa-times"></i>

        

        {props.isLoading ?
        <div className="spinner-prompt">
            <p>Trwa ładowanie</p>
            <Spinner />
        </div> : null}

        {props.error ?
        <p className="loading-error">{props.errorMessage}</p> : 

        <div className="chat-users">
            <ul>
                {usersToShow.map(item => {
                    return (
                        <li key={item.id}>
                        <img src={
                        item.profilePicture ? 
                        apiPicturesUrl + item.profilePicture.avatar :
                        item.sex ? require('assets/img/empty_avatars/empty-avatar-girl.jpg') : 
                        require('assets/img/empty_avatars/empty_avatar_man.jpg')
                        } alt={item.username}/>
                            <b>
                                {item.username}
                            </b>
                        </li>
                    );
                })}
            </ul>
        </div>
        
        
        
        }
       
    </div>
    );
}

export default chatClient;