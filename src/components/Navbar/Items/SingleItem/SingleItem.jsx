import React from 'react';
import {NavLink} from 'react-router-dom';
import './SingleItem.css';

const singleItem = (props) => (
    <NavLink to={props.url} activeClassName="selected">
        <li onClick={props.changeNothing}>
            {props.name}
        </li>
    </NavLink>
);
export default singleItem;