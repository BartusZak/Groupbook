import React from 'react';
import Modal from  '../Modal/Modal';
import './EmptyGroupsModal.css';
const emptyGroupsModal = (props) => {
    return(
        <Modal show={props.showValidateModal} clickedMethod={props.toogleValidationModal}>
            <p className="modal-validate-error">{props.validateError}</p>
            <button onClick={props.toogleValidationModal} className="modal-validate-error-confirm-button">
                Potwierdzam
            </button>
        </Modal>
    );
    
}

export default emptyGroupsModal;