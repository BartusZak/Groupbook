import React from 'react';
import  './SpinnerContainer.css';
const spinnerContainer = (props) => {
    return (
        <div className="Middle">
            {props.children}
        </div>
    );
}

export default spinnerContainer;