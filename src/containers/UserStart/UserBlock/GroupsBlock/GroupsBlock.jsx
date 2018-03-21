import React, { Component } from 'react';
import { GroupsBlockDiv } from './GroupsBlock.style.jsx';
class GroupsBlock extends Component {
    render(){
    
        return(
            <GroupsBlockDiv>
                <b>Grupy, do których należysz</b>
                <hr />
            </GroupsBlockDiv>
        );
    }
}


export default GroupsBlock;