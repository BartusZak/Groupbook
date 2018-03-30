import React from 'react';
import './GroupsBar.css';
const groupsBar = (props) => {
    const Content = (
        props.groups.length > 0 ? props.groups.map( group => {
            return <li onClick={props.clicked} 
            value={group.id} key={group.body}>{group.name}{props.icon}</li>;
        }) : <p className="adding-information">{props.targetClass === "loaded-groups" ? 
    "Dodałeś już wszystkie grupy" : "Zacznij dodawac grupy"}</p>
    );
    return(
        <ul className={props.targetClass}>
            {Content}
        </ul>
       
    );
}

export default groupsBar;