import React from 'react';

const eventContentBlock = (props) => {
    return(
        <div className={props.actualBlock === props.number ? 
            "visible-block" : "hidden-block"}>
            <p className="user-informations">{props.title}</p>
            {props.children}
        </div>
    );
}
export default eventContentBlock;