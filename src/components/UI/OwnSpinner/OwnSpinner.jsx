import React from 'react';
import './OwnSpinner.css';
const ownSpinner = props => (
<div className="modal-spinner">
        <div className="dot-container">
            <div className="animated-item"></div>
            <div className="animated-item"></div>
        </div>
    <p className="spinner-text">{props.spinnerText}</p>
</div>
);
export default ownSpinner;