import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import './Group.css';
import Event from '../../components/Event/Event';
import GroupLeftSideBar from '../../components/Groups/GroupLeftSideBar/GroupLeftSideBar';
import Modal from '../../components/UI/Modal/Modal';

class Group extends Component{
    state = {
        showEvents: false,
        showPosts: true,
        showMessageModal: false
    }
 
    showEventsClickHandler = () => { this.setState({showEvents: true, showPosts: false}); }
    showPostsClickHandler = () => { this.setState({showEvents: false, showPosts: true}); }
    showMessagesModal = () => { this.setState({showMessageModal: !this.state.showMessageModal}); }
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
                <Modal show={this.state.showMessageModal} clicked={this.showMessagesModal}>
                </Modal>
            </div>
            
        );
    }
}
export default Group;



