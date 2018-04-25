import React, { Component } from 'react';
import './GroupLeftSideBar.css';
import FacetStock from '../../assets/img/profiles/facet.jpg';
import GroupLeftSideBarSingleItem from './GroupLeftSideBarSingleItem/GroupLeftSideBarSingleItem';
import EmptyAvatarMan from '../../assets/img/empty_avatars/empty_avatar_man.jpg';
import EmptyAvatarGirl from '../../assets/img/empty_avatars/empty-avatar-girl.jpg';
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
                        !item.user.sex ? EmptyAvatarGirl : 
                        EmptyAvatarMan : "https://groupsconnectsapi.azurewebsites.net/pictures/" + 
                        item.user.profilePicture.avatar
                    }
                    username={item.user.username}
                    email={item.user.email}
                    isModerator={item.isModerator}
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
            <ul className="left-group-last-add-block">
                {usersList}
            </ul>
        </div>
    );
    
};
export default groupLeftSideBar;