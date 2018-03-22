import React from 'react';
import { GroupList } from './GroupList.style';

const groupList = (props) => {
    return(
        <GroupList>
            <h1>Dodano następujące grupy: </h1>
            <ul style={{overflowY: props.addedGroups.length > 8 ? 'scroll' : 'none'}} className="GroupList">
                {props.addedGroups.map(item => {
                    return <li key={item.id}>{item.name}<b style={{color: 'red'}}>{item.email}</b></li>
                })}
            </ul>
        </GroupList>
        
     
    );
}
export default groupList;
