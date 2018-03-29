import Aux from '../../hoc/Auxi';
import React from 'react';
import EventsBar from './EventsBar/EventsBar';
import Button from '../../components/UI/Button';
const events = (props) => {
    return(
        <Aux> 
            <p className="event-info">Wydarzenia</p>
            <div className="group-main-content">
                <EventsBar id={1}/>
                <EventsBar id={2}/>
                <EventsBar id={3}/>
                <EventsBar id={4}/>
                <EventsBar id={5}/>
                <EventsBar id={6}/>
             
            </div>
            <div className="btn-container">
                <Button title="Następne" color="dark-green" margin="initial auto"/>
            </div>
        </Aux>  
    );
}

export default events
