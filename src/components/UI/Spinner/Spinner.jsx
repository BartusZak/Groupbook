import React from 'react';
import './Spinner.css';

const spinner = (props) => (
    
    <div className="Loader" style={{marginLeft: props.margin, marginTop: props.marginTop}}></div>
);

export default spinner;