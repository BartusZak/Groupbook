import React from 'react';
import { Link } from 'react-router-dom';

const button = (props) => (
    <Link to={props.path}>
         <button className="LogoutButton" onClick={props.clicked}>
            <span>{props.name}</span>
        </button>
    </Link>
);

export default button;