import React from 'react';
import "./CenterComponent.css";

const centerComponent = (props) => {
    let Class = null;
    if(props.currentUrl.includes("/logged/posts")){
        Class = "CenterComponent CenterComponent-flex-column";
    }
        

    else{
        Class = "CenterComponent CenterComponent-flex-row";
    }
    return(
        <div className="CenterComponent">
            {props.children}
        </div>
    );
   
};



export default centerComponent;