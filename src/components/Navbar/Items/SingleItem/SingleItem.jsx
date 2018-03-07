import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    NavLink
  } from 'react-router-dom';
import './SingleItem.css';


const singleItem = (props) => (
    <NavLink to={props.url} activeClassName="selected">
        <li>
        {props.name}
        </li>
    </NavLink>
);
export default singleItem;