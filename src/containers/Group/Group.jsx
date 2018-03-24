import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import './Group.css';
import Event from '../../components/Event/Event';
import GroupLeftSideBar from '../../components/Groups/GroupLeftSideBar/GroupLastAdded';


class Group extends Component{
    state = {
        showEvents: false,
        showPosts: true
    }
 
    showEventsClickHandler = () => { this.setState({showEvents: true, showPosts: false}); }
    showPostsClickHandler = () => { this.setState({showEvents: false, showPosts: true}); }
    render(){
        return(
            <div className="background-container">
                <div className="left-trash-container"></div>
                <GroupLeftSideBar />
                <div className="group-container">
                    <Event didShowEvents={this.state.showEvents}
                     didShowPosts={this.state.showPosts}
                     showEvents={this.showEventsClickHandler}
                     showPosts={this.showPostsClickHandler}/>
                </div>
            </div>
            
        );
    }
}
export default Group;



