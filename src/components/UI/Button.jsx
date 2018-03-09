import React from 'react';
import './Button.css';
import { Link } from 'react-router-dom';
const button = (props) => {
    const ButtonClass = "Button";
    const InputClass = " " + props.class;

    return (
        <Link to={props.url}>
            <button 
                onClick={props.clicked} 
                className={ButtonClass + InputClass} 
                disabled={props.isDisable}>
                {props.title}
            </button>
        </Link> 
    );
  
   

   
};

export default button;