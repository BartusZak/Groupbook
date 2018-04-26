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
import axios from 'axios/axios-groupsconnects';
import { withRouter } from 'react-router-dom';
import Spinner from '../../components/UI/Spinner/Spinner';
import { concatingUrlTitle } from '../../helperMethods/helperMethods';
import AddGroupMessage from '../../components/UI/ErrorPromptMessage/ErrorPromptMessage';
import Transition from 'react-transition-group/Transition';
import {apiPicturesUrl} from 'axios/apiPicturesUrl';
import { loadGroupActionCreator } from '../../store/Groups/Actions';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import Aux from '../../hoc/Auxi';
import UserNotInGroup from './UserNotInGroup/UserNotInGroup';
import { Link } from 'react-router-dom';


class Group extends Component{
   
    state = {
        showEvents: false,
        showPosts: true,
        showSendMessageToOwnerModal: false,

        loadingGroupDataSpinner: true,
        showBackdrop: true,
        loadedData: [],
        loadedPosts: [],

        succOperationPrompt: false
    }
    componentDidMount(){ 
        this.props.loadGroup(concatingUrlTitle(this.props.history.location)); // dlatego, ze poczekalnia to 2
        if(this.props.history.location.state){
            this.setState({ succOperationPrompt: true });
            setTimeout(() => {
                this.setState({ succOperationPrompt: false });
              }, 3000);
        }
    }
    
    componentDidUpdate(prevProps){
        if(prevProps.loadedGroup !== this.props.loadedGroup 
            || prevProps.loadedGroupErrors !== this.props.loadedGroupErrors){
            this.setState({loadedData: this.props.loadedGroup, 
                loadingGroupDataSpinner: false, loadedPosts: this.props.loadedGroup.posts ,
                showBackdrop: false})
        }
    }
    showEventsClickHandler = () => { this.setState({showEvents: true, showPosts: false}); }
    showPostsClickHandler = () => { 
        this.setState({showEvents: false, showPosts: true});
        this.props.loadGroup(concatingUrlTitle(this.props.history.location));
    }
    modalShowClickHandler = () => { this.setState({showSendMessageToOwnerModal: 
        !this.state.showSendMessageToOwnerModal}); }

    checkIfUserIsInGroup = () => {
        const responseObject = JSON.parse(localStorage.getItem('responseObject'));
        let result = false;
        let lider = null;
        for(let key in this.props.loadedGroup.userGroups){
            if(this.props.loadedGroup.userGroups[key].user.id === responseObject.id){
                result = true;
            }
        }
        const objectToSend = {
            result: result
        }
        return objectToSend;
    }

    render(){
        const isUserInGroup = this.checkIfUserIsInGroup();
        return(
            <Aux>
            <Backdrop show={this.state.showBackdrop}>
                 {this.state.loadingGroupDataSpinner ? <Spinner /> : null}
             </Backdrop>


            {this.props.loadedGroupErrors.length > 0 ? 
            <h1 className="group-error">{this.props.loadedGroupErrors[0]}</h1> :
            <div className="background-container">
             
             <Transition 
                 mountOnEnter 
                 unmountOnExit 
                 in={this.state.succOperationPrompt}
                 timeout={500}>
                     {state => (
                          <AddGroupMessage 
                          color="green"
                          message={"Poprawnie dodano element"}
                          animationType={this.state.succOperationPrompt ? "succ-add-group-message-in"
                      : "succ-add-group-message-out"}/>
                     )}
             </Transition>


             <div className="left-trash-container">
                 <GroupLeftSideBar 
                 users={this.state.loadedData.userGroups}
                 loadingUsersError={this.state.loadingGroupDataError} />
                 
             </div>
             
             <div className="group-container">
                 

                 <p className="group-title-full">{this.state.loadedData.name}</p>
                
                 <nav style={{backgroundImage: `url(${this.state.loadedData.picture ? 
                     apiPicturesUrl + 
                     this.state.loadedData.picture.fullResolutionPicName: Back})`}} className="navigation-bar">
                     {isUserInGroup.result ? 
                     <span className="group-owner">Należysz <i className="fa fa-check"></i></span> :
                     <span className="group-owner">Nie należysz <i className="fa fa-ban"></i></span>}
                     
                 </nav>
                 
                 
                 <div className="navigate">
                     {isUserInGroup.result ? <div className="group-nav-left">
                         <i onClick={this.showPostsClickHandler} className="fa fa-clipboard"></i>
                         <i onClick={this.showEventsClickHandler} className="fa fa-calendar"></i>
                     </div> : null}
                     <div>
                        <Link className="add-smth-new-link-in-group" to="/logged/addpost">
                            Dodaj post
                        </Link>
                        <Link className="add-smth-new-link-in-group" to="/logged/addevent">
                            Dodaj wydarzenie
                        </Link>
                     </div>
                    
                        
                    
                     
                     <div className="group-nav-right">
                         <i onClick={this.modalShowClickHandler} className="fa fa-envelope"></i>
                         <i onClick={this.modalShowClickHandler} className="fa fa-user-plus"></i>
                     </div>                               
                 </div>
                 <p className="group-desc-title">Opis grupy</p>
                 <p className="group-desc">{this.state.loadedData.description} </p>

                {isUserInGroup.result ? this.state.showEvents ? <Events 
                events={this.props.loadedGroup.events}
                groupId={this.props.loadedGroup.id}/> : 
                   <Posts 
                   groupName={this.state.loadedData.name} loadingPostsError={this.state.loadingPostsError}
                   
                    posts={this.state.loadedPosts} /> : <UserNotInGroup />}
                
                
                
                  
             </div>
             <Modal
             show={this.state.showSendMessageToOwnerModal} 
             clickedMethod={this.modalShowClickHandler}> 
                 <OpenedMessage />
             </Modal>
            </div>
            }
           
            </Aux>
            
            
        );
    }
}

const mapStateToProps = state => {
    return {
        loadedGroup: state.GroupReducer.loadedGroup,
        loadedGroupErrors: state.GroupReducer.loadedGroupErrors
    };
}

const mapDispatchToProps = dispatch => {
    return {
        loadGroup: (groupId) => dispatch(loadGroupActionCreator(groupId))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Group));
