import React from 'react';
import './GroupsBar.css';
const groupsBar = props => {
    /*
    const Content = (
        props.groups.length > 0 ? props.groups.map( group => {
            return <li className="list-itemo" onClick={props.clicked} 
            value={group.group.id} key={group.group.name}>{group.group.name}</li>;
        }) : <p className="adding-information">{props.targetClass === "loaded-groups" ? 
    "Dodałeś już wszystkie grupy" : "Zacznij dodawac grupy"}</p>
    );
    */
    return(
        <ul className={props.targetClass}>
            {props.groups.map(i => {
                return <li 
                value={i.group.id}
                onClick={props.clicked}
                className="list-itemo"
                key={i.group.id}
                >{i.group.name}</li>
            })}
        </ul>
       
    );
}

export default groupsBar;