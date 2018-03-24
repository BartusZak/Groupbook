import React from 'react';
import './EventsBar.css';
import SingleEvent from './SingleEvent/SingleEvent';
const eventsBar = (props) => {
    return(
        <div className="events-bar">
            <h5 className="events-header">
                Spotkanie z matka teresą z kalkuty
            </h5>
            <SingleEvent />
         
        </div>
    );
}
export default eventsBar;