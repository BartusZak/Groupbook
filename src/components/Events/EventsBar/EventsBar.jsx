import React from 'react';
import './EventsBar.css';
import SingleEvent from './SingleEvent/SingleEvent';
const eventsBar = (props) => {
    return(
        <div className="events-bar">
            <h5 className="events-header">
                {props.title}
            </h5>
            <SingleEvent 
            id={props.id}
            title={props.title}
            picture={props.picture}
            eventDate={props.eventDate}
            description={props.description}/>
        </div>
    );
}
export default eventsBar;