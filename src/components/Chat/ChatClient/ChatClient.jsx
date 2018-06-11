import React from 'react';
import './ChatClient.css';
import Spinner from '../../../components/UI/OwnSpinner/OwnSpinner';
import { apiPicturesUrl } from '../../../axios/apiPicturesUrl';
import Transition from 'react-transition-group/Transition';
import SingleConnection from './SingleConnection/SingleConnection';

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
  
        <Transition 
            mountOnEnter 
            unmountOnExit 
            in={props.usersPanel}
            timeout={400}>
                    {state => (
                       <div className={`chat-users ${props.usersPanel ? "chat-users-in" : "chat-users-out"}`}>
                            <ul ref={props.reference} onScroll={props.loadMoreUsers}>
                                {usersToShow.map(item => {
                                    return (
                                        <li id={item.id} onClick={props.startConnection} key={item.id}>
                                        <img id={item.id} src={
                                        item.profilePicture ? 
                                        apiPicturesUrl + item.profilePicture.avatar :
                                        item.sex ? require('assets/img/empty_avatars/empty-avatar-girl.jpg') : 
                                        require('assets/img/empty_avatars/empty_avatar_man.jpg')
                                        } alt={item.username}/>
                                            <b id={item.id}>
                                                {item.username}
                                            </b>
                                        </li>
                                    );
                                })}
                            </ul>
                        
                            {props.isLoadingMoreUsers ? 
                            <Spinner /> : null}
                            
                            
                       </div>
                    )}
        </Transition> }
       
        

        {props.usersPanel ? 
        <button onClick={props.toggleUserPanel} 
        className="toggle-panel-button">Schowaj</button> : 

        <button onClick={props.toggleUserPanel} className="toggle-panel-button open-button">
            Otwórz panel
        </button>}

        <div className={props.usersPanel ? "connection-section-open" : "connection-section-closed"}>
            <h2>Otwarte konwersacje</h2>

            <div className="single-sections-container">
            {props.openedConnections.map(i => {
                return (
                    <SingleConnection closeSingleWindow={props.closeSingleWindow} 
                    id={i.id} key={i.id} username={i.username}/>
                );
            })}
            </div>
            
        </div>
        
        
     
    </div>
    );
}

export default chatClient;