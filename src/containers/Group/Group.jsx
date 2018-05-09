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
import { loadGroupActionCreator, joinIntoGroupActionCreator,
    deleteGroupActionCreator, editGroupAcionCreator } from '../../store/Groups/Actions';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import Aux from '../../hoc/Auxi';
import UserNotInGroup from './UserNotInGroup/UserNotInGroup';
import { Link } from 'react-router-dom';
import Prompt from '../../components/UI/Prompt/Prompt';
import Button from '../../components/UI/Button/Button';
import ConfirmModal from '../../components/UI/ActionConfirm/ActionConfirm';


class Group extends Component{
   
    state = {
        showEvents: false,
        showPosts: true,
        showSendMessageToOwnerModal: false,

        loadingGroupDataSpinner: true,
        showBackdrop: true,
        loadedData: [],
        loadedPosts: [],

        succOperationPrompt: false,

        joinIntoGroupSpinner: false,
        joinIntoGroupPrompt: false,

        confirmModal: false,

        deleteGroupSpinner: false,
        deleteGroupPrompt: false,


        editGroupSpinner: false,
        editGroupPrompt: false,
        newName: "",
        newDescription: "",

        openEditPlace: false
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.joinIntoGroupErrors !== this.props.joinIntoGroupErrors){
            this.setState({joinIntoGroupSpinner: false, joinIntoGroupPrompt: true});
            setTimeout(() => {
                this.setState({joinIntoGroupPrompt: false});
            }, 3000);
        }
        if(nextProps.deleteGroupErrors !== this.props.deleteGroupErrors){
            this.setState({deleteGroupSpinner: false, deleteGroupPrompt: true});
            setTimeout(() => {
                this.setState({deleteGroupPrompt: false});
            }, 3000);
        }
        if(nextProps.editGroupErrors !== this.props.editGroupErrors){

        }
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
    joinIntoGroup = () => {
        this.setState({joinIntoGroupSpinner: true});
        const responseObject = JSON.parse(localStorage.getItem('responseObject'));
        this.props.joinIntoGroup(responseObject.id,
            this.state.loadedData.id, this.props.history);
    }

    checkIfUserIsGroupLeader = () => {
        if(this.props.loadedGroup.moderator !== undefined){
            if(this.props.loadedGroup.moderator !== null){
                const responseObject = JSON.parse(localStorage.getItem('responseObject'));
                if(this.props.loadedGroup.moderator.username === responseObject.username)
                    return true;
            }
            
        }
        return false;
    }
    openDeleteModal = () => {
        this.setState({confirmModal: !this.state.confirmModal});
    }

    deleteGroupHandler = () => {
        this.setState({confirmModal: false, deleteGroupSpinner: true});
        const responseObject = JSON.parse(localStorage.getItem('responseObject'));
        this.props.deleteGroup(this.props.loadedGroup.id, responseObject.token,
            this.props.history, responseObject.id);
    }

    editGroupHandler = () => {
        const responseObject = JSON.parse(localStorage.getItem('responseObject'));
        this.props.editGroup(responseObject.token, this.props.loadedGroup.id,
            this.state.newName, this.state.newDescription, this.state.Files)
    }



    render(){
        const isUserGroupLeader = this.checkIfUserIsGroupLeader();
        const isUserInGroup = this.checkIfUserIsInGroup();
        
        return(
            <Aux>
            <Backdrop show={this.state.showBackdrop}>
                 {this.state.loadingGroupDataSpinner ? <Spinner /> : null}
            </Backdrop>

            <Backdrop show={this.state.joinIntoGroupSpinner}>
                <Spinner />
            </Backdrop>

            <Backdrop show={this.state.deleteGroupSpinner}>
                <Spinner />
            </Backdrop>

            {this.props.deleteGroupResult === null ? null : 
                    <Prompt 
                    on={this.state.deleteGroupPrompt} 
                    message={
                        this.props.deleteGroupResult ? 
                        "Pomyślnie usunięto grupę" : 
                        this.props.deleteGroupErrors[0]
                    }
                    promptClass={
                        this.props.deleteGroupResult ? 
                        "prompt-ok" : "prompt-bad" }
                    />
            }

            {this.props.loadedGroupErrors.length > 0 ? 
            <h1 className="group-error">{this.props.loadedGroupErrors[0]}</h1> :
            <div className="background-container">

                {this.props.joinIntoGroupResult === null ? null : 
                    <Prompt 
                    on={this.state.joinIntoGroupPrompt} 
                    message={
                        this.props.joinIntoGroupResult ? 
                        `Pomyślnie dołączyłeś do grupy ${this.state.loadedData.name}` : 
                        this.props.joinIntoGroupErrors[0]
                    }
                    promptClass={
                        this.props.joinIntoGroupResult ? 
                        "prompt-ok" : "prompt-bad" }
                    />
                }
                

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
                
                <div className="group-header-area">
                {this.state.openEditPlace ? 
                <div onSubmit={e => this.editGroupHandler(e)} className="group-edit-input-area">
                    <input onKeyPress className="edit-input" type="text" placeholder="wpisz nowy tytuł..." />
                    <Button 
                    btnClass="circle-button"
                    other={true}>
                        <i className="fa fa-edit"></i>
                    </Button>
                    

                </div> : 
                <p onClick={isUserGroupLeader ? 
                    () => this.setState({openEditPlace: !this.state.openEditPlace}) : null}

                    className="group-title-full">
                    <span>{this.state.loadedData.name}</span>
                    {isUserGroupLeader ?  
                    <i className="fa fa-edit"></i>
                    : null}
                </p>}
                </div>
                
                
                
                
                 <nav style={{backgroundImage: `url(${this.state.loadedData.picture ? 
                    apiPicturesUrl + 
                    this.state.loadedData.picture.fullResolutionPicName: Back})`}} className="navigation-bar">
                    {isUserInGroup.result ? 
                     
                     
                    <span className="group-owner">Należysz <i className="fa fa-check"></i></span> :
                    <span className="group-owner">Nie należysz <i className="fa fa-ban"></i></span>}

                    {isUserGroupLeader ? 
                        <div className="leader-options">
                            <Button btnClass="user-opts-edit" content="Edytuj grupę" />
                            <Button clicked={this.openDeleteModal} btnClass="user-opts-del" content="Usuń grupę" />
                        </div>
                        : null
                    } 

                    <ConfirmModal mode="Small" action={this.deleteGroupHandler}
                    clicked={this.openDeleteModal} show={this.state.confirmModal}>
                        <div className="delete-group-prompt">
                            <i onClick={this.openDeleteModal} className="fa fa-close den"></i>
                            <h2>Jesteś pewny?</h2>
                            <p>Czy jestes pewny, że chcesz usunąć grupę <b>{this.props.loadedGroup.name}</b>. Pamiętaj, że ten zabieg
                            jest nie odwracalny.</p>
                            <div className="delete-group-buttons">
                                <Button clicked={this.openDeleteModal} 
                                btnClass="user-opts-deny" content="Anuluj" />

                                <Button clicked={this.deleteGroupHandler} 
                                btnClass="user-opts-del" content="Usuń grupę" />

                                
                            </div>
                        </div>
                    
                    </ConfirmModal>
                    
                </nav>
                 
                 
                 <div className="navigate">
                     {isUserInGroup.result ? <div className="group-nav-left">
                         <i onClick={this.showPostsClickHandler} className="fa fa-clipboard"></i>
                         <i onClick={this.showEventsClickHandler} className="fa fa-calendar"></i>
                     </div> : null}

                     {isUserInGroup.result ? 
                     <div>
                        <Link className="add-smth-new-link-in-group" to="/logged/addpost">
                            Dodaj post
                        </Link>
                        <Link className="add-smth-new-link-in-group" to="/logged/addevent">
                            Dodaj wydarzenie
                        </Link>
                    </div> : null}
                     
                    
                        
                    
                     
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
                   
                    posts={this.state.loadedPosts} /> : <UserNotInGroup clicked={this.joinIntoGroup}/>}
                
                
                
                  
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
        loadedGroupErrors: state.GroupReducer.loadedGroupErrors,

        joinIntoGroupResult: state.GroupReducer.joinIntoGroupResult,
        joinIntoGroupErrors: state.GroupReducer.joinIntoGroupErrors,

        deleteGroupResult: state.GroupReducer.deleteGroupResult,
        deleteGroupErrors: state.GroupReducer.deleteGroupErrors,

        editGroupResult: state.GroupReducer.editGroupResult,
        editGroupErrors: state.GroupReducer.editGroupErrors
    };
}

const mapDispatchToProps = dispatch => {
    return {
        loadGroup: (groupId) => dispatch(loadGroupActionCreator(groupId)),
        joinIntoGroup: (UserId, GroupId) => dispatch(joinIntoGroupActionCreator(UserId, GroupId)),
        deleteGroup: (GroupId, token, history, userId) => dispatch(deleteGroupActionCreator(GroupId, token, history, userId)),
        editGroup: (token, groupId, Name, Description, Files) => dispatch(editGroupAcionCreator(token, groupId, Name, Description, Files))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Group));
