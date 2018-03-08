import React from 'react';
import './NavbarButton.css';
import { Link } from 'react-router-dom';

const button = (props) => (
    <Link to={props.path}>
         <button className="NavbarButton" onClick={props.clicked}>
            <span>{props.name}</span>
        </button>
    </Link>
);

export default button;