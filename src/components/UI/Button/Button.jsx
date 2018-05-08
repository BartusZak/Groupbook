import React from 'react';
import './Button.css';
const button = props => {
    return (
        <button onClick={props.clicked} 
        className={`uni-btn ${props.btnClass}`}>
            {props.content}
        </button>
    );
}

export default button;