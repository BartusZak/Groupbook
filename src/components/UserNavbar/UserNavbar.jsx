import React, { Component } from 'react';
import './UserNavbar.css';
import 'font-awesome/css/font-awesome.min.css';
import UserNavbarGroup from '../UI/GroupsBlock/GroupsBlock';
import UserNavbarPosts from '../UI/PostsBlock/PostsBlock';
import { Link } from 'react-router-dom';


class UserNavbar extends Component{
    state = {
        isShowGroups: false,
        isShowMyPosts: false
    }
    changeShowGroups = () => {
        this.setState({isShowGroups: !this.state.isShowGroups, isShowMessages: false, isShowMyPosts: false});
    }
    changeShowPosts = () => { 
        this.setState({isShowMyPosts: !this.state.isShowMyPosts, isShowGroups: false, isShowMessages: false});   
    }

    render(){
        const whichBlockShows = this.state.isShowGroups ? <UserNavbarGroup delFiles={this.props.delFiles}/> :
        this.state.isShowMyPosts ? <UserNavbarPosts /> : null;
        return(
        <div className={this.props.isFixed + " user-help-bar"}>
            <div className="navigation-help-bar">
            <Link to="/logged/addgroup" className="new-group"> Dodaj nową grupe</Link>
                <div onClick={this.props.activateChatWindow}>
                    <i className='fa fa-envelope-o'/>
                </div>

                <div onClick={this.changeShowGroups}>
                    <i className='fa fa-group'/>
                </div>
                <div onClick={this.changeShowPosts}>
                    <i className='fa fa-newspaper-o'/>
                </div>
                
            </div>
            {whichBlockShows}
        </div>
        );
    }
}
export default UserNavbar;