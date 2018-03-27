import React from 'react';
import './EventDetailsBlock.css';
import SingleEventDetail from './SingleEventDetail/SingleEventDetail';
const eventDetailsBlock = (props) => {
    return(
        <div className="right-events-block">
            <p className="right-events-title">Wydarzenia</p>
            {props.events !== null ? props.events.
            map(item => {
                return <SingleEventDetail key={item} />
            }) : null }
        </div>
    );
}

export default eventDetailsBlock;