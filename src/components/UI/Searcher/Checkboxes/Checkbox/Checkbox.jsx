import React from 'react';
import './Checkbox.css';

const checkbox = (props) => (
    <label className="checkboxContainer">{props.title}
        <input type="radio" name="radio" />
        <span className="checkmark"></span>
    </label>
);

export default checkbox;