import React from 'react';
import "./CenterComponent.css";

const centerComponent = (props) => (
    <div className="CenterComponent">
        {props.children}
    </div>
);



export default centerComponent;