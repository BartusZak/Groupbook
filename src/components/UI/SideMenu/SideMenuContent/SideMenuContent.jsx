import React, { Component } from 'react';
import Aux from '../../../../hoc/Auxi';
import './SideMenuContent.css';
import { withRouter } from 'react-router-dom'
import Image from '../../../../assets/img/404/404.jpg';
import {connect} from 'react-redux';
import { concatingUrl } from '../../../../helperMethods/concatingUrl';


class SideMenuContent extends Component{
    state = {
        currentLocation: "",
        userObject: JSON.parse(localStorage.getItem('responseObject'))
    }
    componentDidMount(){
        this.setState({currentLocation: concatingUrl(window.location.href)}); 
    }
    redirectToGroup = groupId => {
        this.setState({currentLocation: "/logged/group/" + groupId});
        this.props.history.push("/logged/group/" + groupId);
        window.location.reload();
    }
    redirectToAddPost = () => {
        this.setState({currentLocation: "addpost"});
        this.props.history.push("/logged/addpost");
    }
    redirectToAddEvent = () => {
        this.setState({currentLocation: "addevent"});
        this.props.history.push("/logged/addevent");
    }
    redirectToAddGroup = () => {
        this.setState({currentLocation: "addgroup"});
        this.props.history.push("/logged/addgroup");
    }

    redirectToProfile = () => {
        this.setState({currentLocation: this.state.userObject.id.toString()});
        this.props.history.push("/logged/user/" + this.state.userObject.id);
    }
   
    render(){
        return(
        <Aux>
            <div className="side-bar-groups">
                <p className="SideBarTitle">Twoje grupy </p>
                <div className="groups-place-holder">
                    <div onClick={() => this.redirectToGroup(2)}>
                        <img src={Image} alt="Nazwa grupy" />
                    </div>    
                    <div onClick={() => this.redirectToGroup(1)}>
                        <img src={Image} alt="Nazwa grupy" />
                    </div>                
                    <div onClick={() => this.redirectToGroup(3)}>
                        <img src={Image} alt="Nazwa grupy" />
                    </div>                
                    <div onClick={() => this.redirectToGroup(4)}>
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
                className={this.state.currentLocation === "addpost" ? "sidebar-butt overline-butt" : "sidebar-butt"}>Dodaj post</span>
                
                <span  
                onClick={this.redirectToAddEvent} 
                className={this.state.currentLocation === "addevent" ? "sidebar-butt overline-butt" : "sidebar-butt"}>Dodaj wydarzenie</span>

                <span
                onClick={this.redirectToAddGroup} className={this.state.currentLocation === "addgroup" ?
                     "sidebar-butt overline-butt" : "sidebar-butt"}>Stwórz grupe</span>

                <span
                onClick={this.redirectToProfile} 
                className={this.state.currentLocation === (this.state.userObject !== null)? this.state.userObject.id.toString():null ? 
                    "sidebar-butt overline-butt" : "sidebar-butt"} >
                    Twój profil
                </span>
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