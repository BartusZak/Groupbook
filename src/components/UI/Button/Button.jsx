import React from 'react';
import './Button.css';
import Aux from '../../../hoc/Auxi';
const button = props => {
    return (
        <Aux>
            {props.other ? 
                <button className={props.btnClass} type="submit" value={props.name}>
                    {props.children}
                </button>

                : <button onClick={props.clicked} 
                className={`uni-btn ${props.btnClass}`}>
                    {props.content}
                </button>
            }
        </Aux>
        
    );
}

export default button;