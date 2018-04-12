import React, { Component } from 'react';
import Aux from '../../../../hoc/Auxi';
import './SideMenuContent.css';
import { withRouter } from 'react-router-dom'
import Image from '../../../../assets/img/404/404.jpg';
import {connect} from 'react-redux';

class SideMenuContent extends Component{
    state = {
        addPost: false,
        addEvent: false,
        addGroup: false,
        profile: false,
        userObject: null

    }
    componentDidMount(){
        const responseObject = JSON.parse(localStorage.getItem('responseObject')) !== null ?
            JSON.parse(localStorage.getItem('responseObject')) : this.props.user;
        this.setState({userObject: responseObject});
    }
    clearState = () => {
        this.setState({addPost: false, addEvent: false, addGroup: false, profile: false});
    }
    redirectToAddPost = () => {
        this.setState({addPost: true, addEvent: false, addGroup: false, profile: false});
        this.props.history.push("/logged/addpost");
    }
    redirectToGroup = (groupId) => {
        this.clearState();
        this.props.history.push("/logged/group/" + groupId);
    }
    redirectToAddEvent = () => {
        this.setState({addPost: false, addEvent: true, addGroup: false, profile: false});
        this.props.history.push("/logged/addevent");
    }
    redirectToProfile = () => {
        this.setState({addPost: false, addEvent: false, addGroup: false, profile: true});
        this.props.history.push("/logged/user/" + this.state.userObject.id);
    }
    redirectToAddGroup = () => {
        this.setState({addPost: false, addEvent: false, addGroup: true, profile: false});
        this.props.history.push("/logged/addgroup");
    }
    render(){
        return(
        <Aux>
            <div className="side-bar-groups">
                <p className="SideBarTitle">Twoje grupy </p>
                <div className="groups-place-holder">
                    <div onClick={() => this.redirectToGroup(1)}>
                        <img src={Image} alt="Nazwa grupy" />
                    </div>    
                    <div onClick={() => this.redirectToGroup(1)}>
                        <img src={Image} alt="Nazwa grupy" />
                    </div>                
                    <div onClick={() => this.redirectToGroup(1)}>
                        <img src={Image} alt="Nazwa grupy" />
                    </div>                
                    <div onClick={() => this.redirectToGroup(1)}>
                        <img src={Image} alt="Nazwa grupy" />
                    </div>                                                         
                </div>
            </div>
            <div className="side-bar-messages">
                <p className="SideBarTitle">Ostatnie wiadomości</p>
                <ul className="messages-place-holder">
                    <li>ela23213</li>
                    <li>s(ela19932)</li>
                    <li>ela19932</li>
                    <li>ELzbietxs</li>
                </ul>
            </div>
            <div className="sidebar-buttons">
                <span 
                onClick={this.redirectToAddPost} 
                className={this.state.addPost ? "sidebar-butt overline-butt" : "sidebar-butt"}>Dodaj post</span>
                
                <span  
                onClick={this.redirectToAddEvent} className="sidebar-butt"
                className={this.state.addEvent ? "sidebar-butt overline-butt" : "sidebar-butt"}>Dodaj wydarzenie</span>

                <span
                onClick={this.redirectToAddGroup} className={this.state.addGroup ?
                     "sidebar-butt overline-butt" : "sidebar-butt"}>Stwórz grupe</span>
                <span
                onClick={this.redirectToProfile} 
                className={this.state.profile ? "sidebar-butt overline-butt"
                : "sidebar-butt"}>Twój profil</span>
            </div>  
            </Aux>
        );
    }
}
const mapStateToProps = state => {
    return {
        user: state.logRed.loggingObject,
    };
}
export default connect( mapStateToProps, null)(withRouter(SideMenuContent));