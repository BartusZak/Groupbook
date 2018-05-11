import React from 'react';
import ConfirmModal from '../ActionConfirm/ActionConfirm';
import Button from '../Button/Button';
import './ConfirmPrompt.css';
import OwnSpinner from '../OwnSpinner/OwnSpinner';
const confirmPrompt = props => {
    return(
        <ConfirmModal mode="Small" clicked={props.close} show={props.show}>
            <div className="delete-group-prompt">
                <i onClick={props.close} className="fa fa-close den"></i>
                    <h2>Jesteś pewny?</h2>
                    <p>{props.message}</p>
                    <div className="delete-group-buttons">

                    <Button clicked={props.close} 
                    btnClass="user-opts-deny" content="Anuluj" />

                    <Button clicked={props.action} 
                    btnClass="user-opts-del" content={props.btnName} />

                                
                </div>

                {props.animation ?
                <OwnSpinner spinnerText={props.spinnerText} /> : null}
                
            
                
            </div>
                    
        </ConfirmModal>
    );
}

export default confirmPrompt;