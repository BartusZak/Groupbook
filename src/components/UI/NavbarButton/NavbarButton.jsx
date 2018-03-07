import React from 'react';
import './NavbarButton.css';

const button = (props) => (
    <button className="NavbarButton">
        <span>{props.name}</span>
    </button>
);

export default button;