import React from 'react';
import "./OneInputEdit.css";
import Button from '../UI/Button/Button';
const oneInputEdit = props => {
    return (
    <form onSubmit={props.editGroupHandler} className="group-edit-input-area">
        <i onClick={props.close} className="fa fa-times"></i>
        <input onChange={props.onEditHandler}
        value={props.newName} className="edit-input" 
        type="text" placeholder={props.placeholder} />
        
        {props.error ? 
        <p className="validation-message">{props.error}</p>:null}
                    
        <Button 
            btnClass={`${props.btnClass} ${props.error ? "dis-btn-circle" : null}`}
            other={props.other}
            disabled={props.error ? true : false}>
                {props.btnContent}

        </Button>
                    

    </form>
    );
}
export default oneInputEdit;
