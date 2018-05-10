import React from 'react';
import ConfirmModal from '../ActionConfirm/ActionConfirm';
import Button from '../Button/Button';
import './ConfirmPrompt.css';
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
                <div className="modal-spinner">
                    <div className="dot-container">
                        <div className="animated-item"></div>
                        <div className="animated-item"></div>
                    </div>
                    <p className="spinner-text">{props.spinnerText}</p>
                </div> : null}
            
                
            </div>
                    
        </ConfirmModal>
    );
}

export default confirmPrompt;