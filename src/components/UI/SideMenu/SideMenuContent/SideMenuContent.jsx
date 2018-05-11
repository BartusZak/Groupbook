import React, { Component } from 'react';
import Aux from '../../../../hoc/Auxi';
import './SideMenuContent.css';
import { withRouter } from 'react-router-dom'
import Image from '../../../../assets/img/groupimages/back.jpg';
import {connect} from 'react-redux';
import { concatingUrl } from '../../../../helperMethods/concatingUrl';
import { loadGroupActionCreator, loadRandomGroupsActionCreator } from '../../../../store/Groups/Actions';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import  { apiPicturesUrl } from '../../../../axios/apiPicturesUrl';

class SideMenuContent extends Component{
    state = {
        currentLocation: "",
        userObject: JSON.parse(localStorage.getItem('responseObject')),
        loadedGroups: []
    }
    componentDidMount(){
        if(this.state.userObject){
            const responseObject = JSON.parse(localStorage.getItem('responseObject'))
            this.props.loadRandomGroup(responseObject.id);
            this.setState({currentLocation: concatingUrl(window.location.href)}); 
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.loadedRandomGroups){
            const oldArray = [...this.props.loadedRandomGroups];
            const size = Math.ceil(oldArray.length/4);
            const mainArray = [];
            let helper = 0;
            let end = 4;
            for(let i = 0 ; i < size; i++){
                const array = [];
                for(let j = helper ; j < end; j++){
                    array.push(this.props.loadedRandomGroups[j]);
                }
                mainArray.push({id: i, array: array});
                helper += 4;
                end = (end+4 > oldArray.length ? oldArray.length : end+4);
            }
            this.setState({loadedGroups: mainArray});
        }
    }
  
    redirectToGroup = groupId => {
        this.setState({currentLocation: "/logged/group/" + groupId});
        this.props.loadGroup(groupId, this.props.history);
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
        const settings = {
            dots: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: false,
            dotsClass: "dots-slider slick-dots"
          };
        return(
        <Aux>
            <div className="side-bar-groups">
                <p className="SideBarTitle">Losowe grupy</p>
                
                <Slider className="slider-container" {...settings} >
                    {this.state.loadedGroups ? 
                        this.state.loadedGroups.map(i => {
                            return (
                            <div key={i} className="groups-place-holder">
                                {i.array.map( j => {
                                    return (
                                        <div key={j.name} onClick={() => this.redirectToGroup(j.id)}>
                                            <img src={!j.picture ? Image : apiPicturesUrl + j.picture.smallResolutionPicName}
                                            onError={(e)=>{e.target.src=require('assets/img/404/error-image-generic.png')}
                                            
                                            
                                            } 
                                            alt={j.name} />
                                        </div>  
                                    );
                                })}
                               
                            </div>   
                            );
                        }) : null}
                                                                                                                                                                                                                                 
                </Slider>
                
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
        loadedRandomGroups: state.GroupReducer.loadedRandomGroups,
        loadedRandomGroupsErrors: state.GroupReducer.loadedRandomGroupsErrors,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        loadGroup: (groupId, history) => dispatch(loadGroupActionCreator(groupId, history)),
        loadRandomGroup: (userId) => dispatch(loadRandomGroupsActionCreator(userId))

    };
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SideMenuContent));