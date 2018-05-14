import React from 'react';
import './SearchGroup.css';
import Button from '../../UI/Button/Button'; 
import moment from 'moment';
const searchGroup = props => {
    const dateNow = moment().format();
    const timeFromGroupCreate = moment(props.item.creationDate.slice(0, 10)).fromNow(dateNow);
    let youInGroup = false;
    if(props.item.userGroups.length > 0){
        for(let key in props.item.userGroups){
            if(props.item.userGroups[key].user.id == props.responseObjectId)
                youInGroup = true;
        }
    }
    const usersInGroup = []; 
    if(props.item.userGroups.length > 0){
        for(let key in props.item.userGroups){
            if(!props.item.userGroups[key].isModerator){
                usersInGroup.push(props.item.userGroups[key]);
            }
        }
    }
    
    console.log(usersInGroup);
    return(
        <div className="search-group-block">
            <div className="search-group-details">
                <header>
                    <span>{props.item.name}</span>
                    <div>
                        {youInGroup ? <i className="fa fa-check"></i> : 
                        <i className="fa fa-times"></i>}

                        <i className="fa fa-users"></i>
                    </div>
                </header>
                <div style={{backgroundImage: `url(${props.item.picture ? 
                props.apiPicturesUrl + props.item.picture.fullResolutionPicName : 
                require("../../../assets/img/groupimages/back.jpg") })`}} className="search-group-pic">
                    <p>
                        <span>{props.item.creationDate.slice(0, 10)}</span>
                        <span>utworzona {timeFromGroupCreate} temu</span>
                    </p>
                    <Button clicked={props.redirectToGroup} content="Szczegóły"/>
                </div>
                <article>
                    {props.item.description}
                </article>

            </div>
            <div className="search-group-elements">
                {props.item.userGroups.length > 0 ? 
                    <div className="users-content">
                        
                        {props.item.moderator !== null ? 
                        <div className="moderator-content">
                            <h3>Moderator</h3>
                            <div id={props.item.moderator.id} 
                            onClick={props.redirectToUser} style={{backgroundImage: `url(${props.item.moderator.profilePicture !== null ? 
                            props.apiPicturesUrl + props.item.moderator.profilePicture.profile : 
                            props.item.moderator.sex ? props.Woman : props.Man})`
                            }} className="moderator-picture"> 
                            </div>

                            <p id={props.item.moderator.id} 
                            onClick={props.redirectToUser}>{props.item.moderator.username}</p>
                        </div> : null}

                        
                        <div className="users-in-search-group">
                            <h4>Użytkownicy</h4>
                            {usersInGroup.map(i => {
                                return (
                                    <div id={i.user.id} onClick={props.redirectToUser} style={{backgroundImage: `url(${i.user.profilePicture ? 
                                    props.apiPicturesUrl + i.user.profilePicture.profile : 
                                    i.user.sex ? props.Woman : props.Man})`}}>
                                    
                                    </div>
                                );
                            })}
                        </div>
                    </div> : 
                    <p className="no-result">
                    Brak użytkowników<i className="fa fa-ban"></i></p>}
                
            </div>
        </div>
    );
    
};

export default searchGroup;