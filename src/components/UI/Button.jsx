import React from 'react';
import './Button.css';
import { Link } from 'react-router-dom';
const button = (props) => (
    <Link to="/logged">
         <button className="Button" disabled={props.isDisable}>
            {props.title}
        </button>
    </Link>
   
);

export default button;