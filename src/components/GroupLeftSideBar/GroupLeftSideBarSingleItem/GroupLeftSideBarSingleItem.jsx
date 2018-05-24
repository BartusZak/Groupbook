import React from 'react';
import { Link } from 'react-router-dom';
const groupPostSingleItem = props => {
    return(
        <div className="single-left-group-container">   
            <div className="left-group-image-holder">
                <img src={props.pic} alt={props.email} onError={(e)=>{e.target.src=require('assets/img/404/error-image-generic.png')}}/>
                <i className="fa fa-envelope"></i>
            </div>
            <Link 
            className="username-link" 
            to={`/logged/user/${props.id}`}>{props.username}</Link> 
            
            {props.isModerator ? <i className="lider-icon">Lider</i> : null}
        </div>
    );
}
export default groupPostSingleItem;