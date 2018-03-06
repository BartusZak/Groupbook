import React from 'react';
import './Button.css';

const button = (props) => (
    <button className="Button" disabled={props.disable}>
        {props.title}
    </button>
);

export default button;