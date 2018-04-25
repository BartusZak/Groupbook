import React from 'react';
import './ErrorPromptMessage.css';

const prompt = props => {
    let basicClass = null;
    switch(props.color){
        case "red":
            basicClass = "error-prompt-message"
            break;
        case "green":
            basicClass = "succ-add-group-message " + props.animationType
            break;
    }
    return(

        <h2 className={basicClass}>
            {props.message}
        </h2>
    );
}

export default prompt;