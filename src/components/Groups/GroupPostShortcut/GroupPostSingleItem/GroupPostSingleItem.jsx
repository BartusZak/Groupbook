import React from 'react';


const groupPostSingleItem = (props) => {
    return(
        <li>
            <div className="left-group-image-holder"><img src={props.pic} alt="" /></div>
            <span className="left-group-name-holder">
                <b>Jarosław Stockowicz</b><i class="fa fa-envelope"></i>
            </span>
        </li>
    );
}
export default groupPostSingleItem;