import React, { Component } from 'react';
import { GroupBlockDiv } from './Group.style';
import 'font-awesome/css/font-awesome.min.css';
import Group from './Group/Group';
class GroupsBlock extends Component {
    state = {
        animation: false
    }
    iniciateAnimationHandler = () => {this.setState({animation: !this.state.animation})}
    render(){
        return(
            <GroupBlockDiv>
                <div className="main-cont">
                    <p><span>Twoje grupy</span><span className="new-group"><i onClick={() => this.iniciateAnimationHandler()} className="fa fa-info-circle"></i>Nowa grupa</span></p>
                    <Group animation={this.state.animation}/>
                </div> 
               
            </GroupBlockDiv>
        );
    }
}


export default GroupsBlock;