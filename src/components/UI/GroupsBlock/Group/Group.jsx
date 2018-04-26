import React from 'react';
import Image from '../../../../assets/img/404/404.jpg';
import { Link } from 'react-router-dom';
import {apiPicturesUrl} from 'axios/apiPicturesUrl';

const group = props => (
    
        <div onClick={props.clicked} className="group-cont">              
            <div className="image-holder">
                <img src={apiPicturesUrl+props.picture} alt="cos"/>
            </div>
            <div className="group-desc">
                <span className="group-title">{props.name}</span>
                <span className="group-op">{props.description}</span>
            </div>
            <div className="group-desc-after" style={{width: props.animation ? '100%' : '0', opacity: props.animation ? '1' : '0' }}>
                <div className="group-additional-info" style={{visibility: props.animation ? 'visible' : 'hidden'}}>
                    <span><b>Data utworzenia:</b> {props.addDate.slice(0,10) + " " + props.addDate.slice(11,16)}</span>
                    <span><b>{props.moderator}</b></span>
                </div>
            </div>
        </div>
   
    
);

export default group;