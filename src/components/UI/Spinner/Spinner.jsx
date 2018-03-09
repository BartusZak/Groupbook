import React from 'react';
import './Spinner.css';
const spinner = (props) => (
    <div className="Loader" style={{marginLeft: props.margin}}>Loading...</div>
);

export default spinner;