import React from 'react';
const groupPostSingleItem = props => {
    return(
        <li>
            <div className="left-group-image-holder">
                <img src={props.pic} alt={props.email} />
            </div>
            <span className="left-group-name-holder">
                <b>{props.username}</b>
            </span>
            <span className="icons-holder">
                <i className="fa fa-envelope"></i>
            </span>
            {props.isModerator ? <i className="lider-icon">Lider</i> : null}
            
            
            
        </li>
    );
}
export default groupPostSingleItem;