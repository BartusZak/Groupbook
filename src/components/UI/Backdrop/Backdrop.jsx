

import React from 'react';
import './Backdrop.css';

const backdrop = (props) => (
    props.show ? <div style={{backgroundColor: props.backGround === "Blank" ? 
    "rgba(0,0,0,0)" : null}} className="Backdrop" onClick={props.clicked}>
    {props.children}</div> : null   
);
export default backdrop;