import React from 'react';
import './Button.css';
import { Link } from 'react-router-dom';
import Aux from '../../hoc/Auxi';

const button = (props) => {
    console.log(props.overRideClass);
    let classes = null;
    let btn = null;
    if(props.overRideClass === undefined){
        classes = "Button" + " " + props.class;  
    }
    else { classes = props.overRideClass; }
      

    if(props.url === undefined){
        btn = (
            <button 
                onClick={props.clicked} 
                className={classes}>
                {props.title}
            </button>
        );
    }
    else{
        btn = (
            <Link to={props.url}>
                <button 
                    onClick={props.clicked} 
                    className={classes}>
                    {props.title}
                </button>
             </Link> 
        );
    }


    return (<Aux>{btn}</Aux>);
        
  
};

export default button;