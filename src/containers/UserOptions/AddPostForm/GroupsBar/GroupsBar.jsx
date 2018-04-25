import React from 'react';
import './GroupsBar.css';
const groupsBar = (props) => {
    //const Content = null;
    const Content =(
            (props.groups.map( group => {
                return 
                    <li className="list-itemo" onClick={props.clicked} 
                        value={group.group.id} key={group.group.name}>
                        {group.group.name}
                    </li>;
            })), 
            <p className="adding-information">
                {props.targetClass === "loaded-groups" ? 
                    "Dodałeś już wszystkie grupy" : "Zacznij dodawac grupy"}
            </p>
    )
    return(
        <ul className={props.targetClass}>
            {Content}
        </ul>
       
    );
}

export default groupsBar;