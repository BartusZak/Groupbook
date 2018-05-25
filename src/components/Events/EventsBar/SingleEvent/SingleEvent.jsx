import React from 'react';
import './SingleEvent.css';
import avocado from '../../../../assets/img/groupimages/avocado.jpg';
import Aux from '../../../../hoc/Auxi';
import { Link } from 'react-router-dom';
import { apiPicturesUrl } from '../../../../axios/apiPicturesUrl';
import moment from 'moment';

const singleEvent = props => {
    const dateNow = moment().format();
    return(
        <Aux>
        <div className="single-event">
            <div className="single-image-placeholder">
                <img onError={(e)=>{e.target.src=require('assets/img/404/error-image-generic.png')}}
                src={props.picture ? apiPicturesUrl + props.picture.mediumResolutionPicName : avocado} alt={props.title} />
            </div>
            <div className="event-desc-holder">
                {!moment(props.eventDate.slice(0,10)).isAfter(dateNow) ? null : 
                <span className="event-status">Nowe</span>   }
                <div className="event-true-content">
                    {props.description}
                </div>
            </div>
            
        </div>
        <div className="date-tag-holder">
            <span className="event-date">
                {
                props.eventDate.slice(0,10) + " " +  props.eventDate.slice(11,16)}
            </span>  
            <Link to={`/logged/event/${props.id}`}  className="load-more-tag">Szczegóły</Link>
        </div>
        </Aux>
    );
}

export default singleEvent;
