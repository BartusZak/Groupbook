import React from 'react';
import './GroupList.css';
import Aux from '../../../hoc/Auxi';
const groupList = (props) => {
    return(
        <Aux>
            <h1>Dodano następujące grupy: </h1>
            <ul style={{overflowY: props.addedGroups.length > 8 ? 'scroll' : 'none'}} className="GroupList">
                {props.addedGroups.map(item => {
                    return <li key={item.id}>{item.name}<b style={{color: 'red'}}>{item.email}</b></li>
                })}
            </ul>
        </Aux>
        
     
    );
}
export default groupList;
