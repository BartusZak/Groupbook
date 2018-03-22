import React from 'react';
import './OpenedMessage.css';

const openedMessage = (props) => {
    return(
        <div className="OpenedMessage">
            {props.children}
        </div>
    );
}
export default openedMessage;