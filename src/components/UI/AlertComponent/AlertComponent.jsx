import React from 'react';
import './AlertComponent.css';
 
const myCustomContentTemplate = props => (
<h5 onClick={props.closeAll} className="alert-container">
    Nowe wiadomości
</h5>
);
 
export default myCustomContentTemplate;