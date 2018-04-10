import React from 'react';

const formItem = (props) => {
    const inputClasses = ["form-control"];
    let validationError = props.errorMessage;


    let emailError = (props.error)?<span>{props.error}<br/></span>:null;
    let passwordError = (props.errorConfirmationPassword !== undefined)?<span>{props.errorConfirmationPassword}<br/></span> : null;
    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push("invalid");
        validationError = <span>{emailError} {passwordError}To pole nie może być puste oraz musi zawierać od {props.min} - {props.max} znaków.</span>
        
    }
    return(
        <div className="form-item">
            <p className="Label">{props.title}</p>
            <input 
            style={{display: "initial"}}
            className={inputClasses.join(' ')}
            maxLength={props.max} 
            type={props.type} 
            placeholder={props.placeholder}
            onChange={props.change}
            name={props.name}
            value={props.text}
            autoComplete={props.autoComplete}/>
            <p className="ValidationError">{validationError}</p>

        </div>
    );
}


export default formItem;