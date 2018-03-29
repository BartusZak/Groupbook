import React from 'react';
import Modal from '../Modal/Modal';
import './ConfirmModal.css';
const confirmModal = (props) =>{
    return(
        
        <Modal clickedMethod={props.openModal} show={props.isOpen}>
            <h5 className="confirm-modal-header">{props.title}</h5>
            <div className="confirm-modal-content">
                <span onClick={props.confirmMethod} className="event-button">
                    Potwierdzam
                </span>
                <span onClick={props.openModal} className="event-button">
                    Anuluj
                </span>
            </div>
        </Modal>        
    );
}

export default confirmModal;