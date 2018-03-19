import React from 'react';
import { NavItem, NavLink} from 'mdbreact';
const singleItem = (props) => (
        
        <NavItem>
            <NavLink to={props.url} className="nav-link">
                {props.name}
            </NavLink>
        </NavItem>
    );
export default singleItem;