import React from 'react';
import './EventDetailsBlock.css';
import SingleEventDetail from './SingleEventDetail/SingleEventDetail';
const eventDetailsBlock = props => {
    return(
        <div className="right-events-block">
            <p className="right-events-title">Wydarzenia</p>
            {props.events !== null ? props.events.
            map(item => {
                return <SingleEventDetail 
                click={props.click}
                title={item.title} 
                key={item.id} 
                id={item.id} 
                picture={item.picture}/>
            }) : null }
        </div>
    );
}

export default eventDetailsBlock;