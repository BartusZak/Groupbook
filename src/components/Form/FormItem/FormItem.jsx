import React from 'react';

const formItem = (props) => {
    const isPassword = props.title === "Hasło" || props.title === "Powtórz hasło" ? "password" : "text";
    const isEmail = props.title === "E-mail" ? "email" : "text";

    


    return(
        <div className="form-item">
            <p className="Label">{props.title}</p>
            <input 
            style={{display: "initial"}}
            className="form-control"
            maxLength={props.max} 
            type={isPassword} 
            placeholder={props.placeholder}
            onChange={props.change}
            name={props.title}
            value={props.text}/>
            <p className="errorMessage">{props.errorMessage}</p>
        
        </div>
    );
}


export default formItem;