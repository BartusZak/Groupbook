import React from 'react';
import "./OneInputEdit.css";
import Button from '../UI/Button/Button';
import Aux from '../../hoc/Auxi';
const oneInputEdit = props => {
    return (
    
    <form onSubmit={props.editGroupHandler} className="group-edit-input-area">

        {props.type === "textarea" ? 
            <div className="group-desc-edit">
                <i onClick={props.close} className="fa fa-times"></i>
                <textarea onChange={props.onEditHandler}
                placeholder={props.placeholder} value={props.newName}>

                </textarea>
                {props.error ? 
                <p className="area-validation-message">{props.error}</p> : null}

                <Button 
                    btnClass={`${props.btnClass} ${props.error ? "dis-btn-circle" : null}`}
                    other={props.other}
                    disabled={props.error ? true : false}>
                        {props.btnContent}

                </Button>

            </div>
            
            :
            <Aux>
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
            </Aux>

        }
        
        
                    

    </form>
    );
}
export default oneInputEdit;
