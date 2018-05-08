import React from 'react';
import './SingleEventDetail.css';
import Image from '../../../../assets/img/groupimages/event1.jpg';
import 'font-awesome/css/font-awesome.min.css';
import { apiPicturesUrl } from '../../../../axios/apiPicturesUrl';
const singleEventDetails = props => {
    return(
        <div id={props.id} onClick={props.click} 
        className="single-event-detail" 
        style={{background: `url(${props.picture ? apiPicturesUrl + props.picture.smallResolutionPicName
            : Image})`}}>
            <p>{props.title}</p>
        </div>
    );
}

        
export default singleEventDetails;