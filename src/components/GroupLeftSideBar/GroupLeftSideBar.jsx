import React, { Component } from 'react';
import './GroupLeftSideBar.css';
import FacetStock from '../../assets/img/profiles/facet.jpg';
import GroupLeftSideBarSingleItem from './GroupLeftSideBarSingleItem/GroupLeftSideBarSingleItem';
import EmptyAvatarMan from '../../assets/img/empty_avatars/empty_avatar_man.jpg';
import EmptyAvatarGirl from '../../assets/img/empty_avatars/empty-avatar-girl.jpg';
import {apiPicturesUrl} from 'axios/apiPicturesUrl';

const groupLeftSideBar = props => {
    let usersList = null;
    if(props.loadingUsersError){
        usersList = <p className="backdropo-error">{props.loadingUsersError}</p>;
    }
    if(props.users){
        usersList = (
            props.users.map( item => {
                return (
                    <GroupLeftSideBarSingleItem 
                    key={item.user.id}
                    pic={
                        item.user.profilePicture === null ?
                        item.user.sex ? EmptyAvatarGirl : 
                        EmptyAvatarMan : apiPicturesUrl + 
                        item.user.profilePicture.avatar
                    }
                    username={item.user.username}
                    email={item.user.email}
                    isModerator={item.isModerator}
                    id={item.user.id}
                    />
                    );
            }) 
        );
    }
        
    
    return(
        <div className="left-group-block">
            <p className="left-group-recent-add">
                Użytkownicy
            </p>
            <div className="left-group-last-add-block">
                {usersList}
            </div>
        </div>
    );
    
};
export default groupLeftSideBar;