import React from 'react';

const formItem = (props) => {
    return(
        <div className="form-item">
            <p className="Label">{props.title}</p>
            <input 
            style={{display: "initial"}}
            className="form-control"
            maxLength={props.max} 
            type={props.type} 
            placeholder={props.placeholder}
            onChange={props.change}
            name={props.title}
            value={props.text}
            autoComplete={props.autoComplete}/>
            <p className="errorMessage">{props.errorMessage}</p>
        
        </div>
    );
}


export default formItem;