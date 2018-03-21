import React from 'react';
import { Button } from './Button.style';
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
            <Button 
                onClick={props.clicked} 
                className={classes}>
                {props.title}
            </Button>
        );
    }
    else{
        btn = (
            <Link to={props.url}>
                <Button 
                    onClick={props.clicked} 
                    className={classes}>
                    {props.title}
                </Button>
             </Link> 
        );
    }


    return (<Aux>{btn}</Aux>);
        
  
};

export default button;