import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import './Group.css';
import GroupLeftSideBar from '../../components/GroupLeftSideBar/GroupLeftSideBar';
import Modal from '../../components/UI/Modal/Modal';
import OpenedMessage from '../../components/UI/OpenedMessage/OpenedMessage';
import Back from '../../assets/img/groupimages/back.jpg';
import Events from '../../components/Events/Events';
import Posts from '../../components/Posts/Posts';
import { connect } from 'react-redux';
import { fetchingPosts } from '../UserOptions/Store/actions';


class Group extends Component{
    state = {
        showEvents: true,
        showPosts: false,
        showSendMessageToOwnerModal: false
    }
    
    componentDidMount(){ this.props.fetchingPosts(); }
    showEventsClickHandler = () => { this.setState({showEvents: true, showPosts: false}); }
    showPostsClickHandler = () => { this.setState({showEvents: false, showPosts: true}); }
    modalShowClickHandler = () => { this.setState({showSendMessageToOwnerModal: 
        !this.state.showSendMessageToOwnerModal}); }
    
    render(){
        return(
            <div className="background-container">
                <div className="left-trash-container">
                    <GroupLeftSideBar />
                </div>
                
                <div className="group-container">
                    <p className="group-title-full">Poczekalnia</p>
                    <nav style={{backgroundImage: `url(${Back})`}} className="navigation-bar">
                        <span className="group-owner">Należysz <i className="fa fa-check"></i></span>
                    </nav>
                    <div className="navigate">
                        <div className="group-nav-left">
                            <i onClick={this.showPostsClickHandler} className="fa fa-clipboard"></i>
                            <i onClick={this.showEventsClickHandler} className="fa fa-calendar"></i>
                        </div>
                        <div className="group-nav-right">
                            <i onClick={this.modalShowClickHandler} className="fa fa-envelope"></i>
                            <i onClick={this.modalShowClickHandler} className="fa fa-user-plus"></i>
                        </div>                               
                    </div>
                    {this.state.showEvents ? <Events /> : 
                    <Posts errorPostLoading={this.props.errorPostLoading}
                    posts={this.props.posts} />}
                     
                </div>
                <Modal
                show={this.state.showSendMessageToOwnerModal} 
                clickedMethod={this.modalShowClickHandler}> 
                    <OpenedMessage />
                </Modal>
            </div>
            
        );
    }
}
const mapStateToProps = state => {
    return {
        posts: state.userOptionsRed.posts,
        errorPostLoading: state.userOptionsRed.errorPostLoading
    };
}
const mapDispatchToProps = dispatch => {
    return {
        fetchingPosts: () => dispatch(fetchingPosts())
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Group);



