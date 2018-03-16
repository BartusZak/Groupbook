import React from 'react';
import './Button.css';
import { Link } from 'react-router-dom';
import Aux from '../../hoc/Auxi';

const button = (props) => {
    const ButtonClass = "Button";
    let btnClass = (props.class != null) ? props.class : "";
    const InputClass = " " + btnClass;
    let btn = null;
  
    if(props.url === undefined){
        btn = (
            <button 
                onClick={props.clicked} 
                className={ButtonClass + InputClass}>
                {props.title}
            </button>
        );
    }
    else{
        btn = (
            <Link to={props.url}>
                <button 
                    onClick={props.clicked} 
                    className={ButtonClass + InputClass}>
                    {props.title}
                </button>
             </Link> 
        );
    }


    return (<Aux>{btn}</Aux>);
        
  
};

export default button;