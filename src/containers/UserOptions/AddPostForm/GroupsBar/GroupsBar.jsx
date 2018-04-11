import React from 'react';
import './GroupsBar.css';
const groupsBar = (props) => {
    const Content = (
        props.groups.length > 0 ? props.groups.map( group => {
            return <li className="list-itemo" onClick={props.clicked} 
            value={group.id} key={group.name}>{group.name}</li>;
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