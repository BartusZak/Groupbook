import React from 'react';

import './Input.css';
//onBlur={props.closeSearch}

const input = props => (
    <div className="holder">
        <input 
        onChange={props.search}
        type="text"
        value={props.value} 
        placeholder="Znajdź.." />
    </div>
);

export default input;