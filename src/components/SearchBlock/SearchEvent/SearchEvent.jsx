import React from 'react';
import './SearchEvent.css';
import Img from '../../../assets/img/404/404.jpg';
import moment from 'moment';
import Button from '../../UI/Button/Button';

const searchEvent = props => {
    const dateNow = moment().format();
    const isEventPast = moment(props.eventDate.slice(0, 10)).isBefore(dateNow);
    const timeFromEvent = moment(props.eventDate.slice(0, 10)).fromNow(dateNow);
    let lider = null;
    for(let key in props.eventUsers){
        if(props.eventUsers[key]){
            if(props.eventUsers[key].isInitiator){
                lider = props.eventUsers[key].user; 
            }
        }
    }
    
    return(
    <div className="search-event-block">
        <div style={{backgroundImage: `url(${Img})`}} className="search-event-picture">
            <h2 className="event-picture-header">
                <span>{props.title}</span>
                <i className="fa fa-calendar"></i>
            </h2>
            <div className="event-owner-picture">
                <span>Założone przez: </span>
                <b id={lider ? lider.id : props.responseObjectId} onClick={props.redirectToUsers}>
                    {lider === null ? "Ciebie" : 
                    lider.id === props.responseObjectId ? "Ciebie" : 
                    lider.username}
                </b>
            </div>

            <footer className="event-picture-footer">
                
                <div className="user-in-event-result">
                    {props.eventUsers[0] ? 
                    <span>
                        Bieżesz udział <i className="fa fa-check"></i>
                    </span> : 
                    <span>
                        Nie bierzesz udziału <i className="fa fa-times"></i>
                    </span>}
                </div>

                <p className="event-start-date">
                    <span>
                        {props.eventDate.slice(0,10)}
                    </span>
                </p>
                <h5 className="user-in-events-header">Biora udział</h5>
                
                <div className="users-in-events-container">
                    {props.eventUsers.map(i => {
                        return (
                            i === null ? null : 
                            i.user.id === props.responseObjectId ? 
                            null :
                            <div onClick={props.redirectToUsers} key={i.user.id}>
                                <img id={i.user.id} src={
                                    i.user.profilePicture ? props.apiPicturesUrl + i.user.profilePicture.profile : i.user.sex ? 
                                    props.Woman : props.Man
                                } alt="Avatar" />
                            </div>
                        ) 
                    })}
                </div>
                
            </footer>
            <div className="how-long-msg">
                <b>
                    {!isEventPast ? 
                    `To wydarzenie się już odbyło ${timeFromEvent} temu` : 

                    `To wydarzenie odbędzie się za ${timeFromEvent}`}
                </b>
            </div>
        </div>
        <Button content="Szczegóły" clicked={props.redirectToEvents} />
    </div>
    );
    
};

export default searchEvent;
