import React from 'react';
import './Prompt.css';

const prompt = props => {
    return(
        <div className={`prompt ${props.promptClass} ${props.on ? 
            "prompt-in" : "prompt-out"}`}>
            {props.message}
        </div>        
    );
}

export default prompt;