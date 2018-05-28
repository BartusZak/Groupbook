import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import './Group.css';
import GroupLeftSideBar from '../../components/GroupLeftSideBar/GroupLeftSideBar';
import Modal from '../../components/UI/Modal/Modal';
import OpenedMessage from '../../components/UI/OpenedMessage/OpenedMessage';
import Back from '../../assets/img/groupimages/back.jpg';
import NotFoundBack from 'assets/img/404/error-image-generic.png';
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
    deleteGroupActionCreator, editGroupAcionCreator, addPictureActionCreator } from '../../store/Groups/Actions';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import Aux from '../../hoc/Auxi';
import UserNotInGroup from './UserNotInGroup/UserNotInGroup';
import { Link } from 'react-router-dom';
import Prompt from '../../components/UI/Prompt/Prompt';
import Button from '../../components/UI/Button/Button';
import ConfirmModal from '../../components/UI/ActionConfirm/ActionConfirm';
import OneInputEdit from '../../components/Edit/OneInputEdit';
import { validateInput, validatePictures } from '../../containers/UserOptions/Validation/Validation';
import Dropzone from 'react-dropzone';
import ReactImageFallback from "react-image-fallback";

const valSettings = [
    {min: 5, max: 120, 
        name: "nazwa grupy", type: "standard"},
    {min: 5, max: 260, 
        name: "opis grupy", type:  "standard"}
]

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
        editData: [
            {error: "", value: ""},
            {error: "", value: ""}
            
        ],
        openEditPlace: false,

        openEditPlaceDesc: false,

        files: [],
        addFilesError: "",

        addPicPrompt: false,
        bgImageLoadedSucces: null
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
            this.setState({editGroupSpinner: false, editGroupPrompt: true, openEditPlace: false, 
                openEditPlaceDesc: false, editData: [{error: "", value: ""}, {error: "", value: ""}]});
            setTimeout(() => {
                this.setState({editGroupPrompt: false});
            }, 3000)
        }
        if(nextProps.addPictureErrors !== this.props.addPictureErrors){
            this.setState({addPicPrompt: true});
            setTimeout(() => {
                this.setState({addPicPrompt: false});
            }, 3000);
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
                let image = false;
                console.log(image);
                if(this.props.loadedGroup.picture !== null){
                    if(this.props.loadedGroup.picture.fullResolutionPicName !== undefined){
                            image = true; //zaimplementowac sprawdzanie obrazow
                     }
                }
                console.log(image);
                
            this.setState({loadedData: this.props.loadedGroup, 
                loadingGroupDataSpinner: false, loadedPosts: this.props.loadedGroup.posts ,
                showBackdrop: false, openEditPlace: false, openEditPlaceDesc: false, 
                bgImageLoadedSucces: image});
                
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

    editGroupHandler = (e, id) => {
        const newData = [...this.state.editData];
        e.preventDefault();
        const result = validateInput(valSettings[id].min,valSettings[id].max, 
            newData[id].value, this.props.loadedGroup.name, "", "",
            valSettings[id].name, valSettings[id].type);

        if(result){
            newData[id].error = result;
            this.setState({editData: newData});
        }
        else{
            this.setState({editGroupSpinner: true});
            const responseObject = JSON.parse(localStorage.getItem('responseObject'));
            this.props.editGroup(responseObject.token, this.state.editData[0].value, this.state.editData[1].value,
                responseObject.id, this.props.loadedGroup, this.props.history);
        }
        
    }

    onEditHandler = (e, id) => {
        const newData = [...this.state.editData];
        newData[id].value = e.target.value;

        const result = validateInput(valSettings[id].min, valSettings[id].max, 
            newData[id].value, this.props.loadedGroup.name, "", "",
            valSettings[id].name, valSettings[id].type);

        newData[id].error = result;

        this.setState({editData: newData});
    }

    onDropHandler = files => {
        const result = validatePictures(files[0].type, 200000, files[0].size);
        if(result === ""){
            const responseObject = JSON.parse(localStorage.getItem('responseObject'));
            this.setState({files: files});
            this.props.addPicture(files[0], this.props.loadedGroup.id,
                responseObject.id, this.props.history);
        }
        this.setState({addFilesError: result}); 
    }
    render(){
        const isUserGroupLeader = this.checkIfUserIsGroupLeader();
        const isUserInGroup = this.checkIfUserIsInGroup();
        let navBar = <nav className="navigation-bar"/>

        let loadedDataLength = Object.keys(this.state.loadedData)

        if(loadedDataLength.length > 0){
            navBar=
            (
            <nav style={{backgroundImage: `url(${
                this.state.files.length > 0 ? this.state.files[0].preview :
                (
                    this.state.loadedData.picture === null ? Back : 
                    (
                        this.state.bgImageLoadedSucces ? apiPicturesUrl + this.state.loadedData.picture.fullResolutionPicName : NotFoundBack
                    )
                )
                })`}}
                className="navigation-bar">
                {isUserInGroup.result ? 
                 
                

                <span className="group-owner">Należysz <i className="fa fa-check"></i></span> :
                <span className="group-owner">Nie należysz <i className="fa fa-ban"></i></span>}

                {isUserGroupLeader ? 
                    <div className="leader-options">
                        <Button clicked={this.openDeleteModal} btnClass="user-opts-del" content="Usuń grupę" />
                        <Dropzone onDrop={this.onDropHandler} className="user-opts-deny">
                            <Button
                            btnClass="change-photo" 
                            content={<Aux><span>Zmień tło grupy</span><i className="fa fa-photo"></i></Aux>} />
                        </Dropzone> 
                      
                    </div>

                    : null
                } 
                {this.state.addFilesError ? 
                <p className="picture-error">{this.state.addFilesError}</p> : null}

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
            )
        }

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
         
            <Backdrop show={this.state.editGroupSpinner}>
                <Spinner />
            </Backdrop>

            {this.props.editGroupResult === null ? null : 
                    <Prompt 
                    on={this.state.editGroupPrompt} 
                    message={
                        this.props.editGroupResult ? 
                        "Edycja wykonana prawidłowo" : 
                        this.props.editGroupErrors[0]
                    }
                    promptClass={
                        this.props.editGroupResult ? 
                        "prompt-ok" : "prompt-bad" }
                    />
            }


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

            {this.props.addPictureResult === null ? null : 
                    <Prompt 
                    on={this.state.addPicPrompt} 
                    message={
                        this.props.addPictureResult ? 
                        "Pomyślnie dodano zdjęcie" : 
                        this.props.addPictureErrors[0]
                    }
                    promptClass={
                        this.props.addPictureResult ? 
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
                
                isUserGroupLeader ? 
                    <OneInputEdit btnContent={<i className="fa fa-edit"></i>} 
                    other={true} btnClass="circle-button" placeholder="wpisz nowy tytuł grupy..." 
                    newName={this.state.editData[0].value} 
                    error={this.state.editData[0].error}
                    onEditHandler={e => this.onEditHandler(e, 0)}
                    editGroupHandler={e => this.editGroupHandler(e, 0)} 
                    close={() => this.setState({openEditPlace: !this.state.openEditPlace, 
                    editData: [{error: "", value: ""}, {error: "", value: ""}]})}
                    />
                     : null
                
                
                : 
                <p
                    className="group-title-full">
                    <span>{this.state.loadedData.name}</span>
                    {isUserGroupLeader ?  
                    <i onClick={isUserGroupLeader ? 
                        () => this.setState({openEditPlace: !this.state.openEditPlace}) : null} className="fa fa-edit"></i>
                    : null}
                </p>}
                </div>
                  
                {navBar}

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

                {this.state.openEditPlaceDesc ?
                    <Aux>
                        <div className="group-header-area">
                            <p className="group-desc-title">
                            Opis grupy</p>
                            {isUserGroupLeader ? 
                                <OneInputEdit 
                                btnContent={<i className="fa fa-edit"></i>}
                                other={true} btnClass="desc-button"
                                placeholder="wpisz nowy opis grupy..." 
                                newName={this.state.editData[1].value} 
                                type="textarea"
                                error={this.state.editData[1].error}
                                onEditHandler={e => this.onEditHandler(e, 1)}
                                editGroupHandler={e => this.editGroupHandler(e, 1)} 
                                close={() => this.setState({openEditPlaceDesc: !this.state.openEditPlaceDesc, 
                                editData: [{error: "", value: ""}, {error: "", value: ""}]})}
                                /> : null
                            }
                            
                        </div>
                        <p className="group-desc">{this.state.editData[1].value} </p>
                    </Aux> 
                    
                     : 
                     
                    <Aux>
                        <p className="group-desc-title">
                        Opis grupy
                        {isUserGroupLeader ?
                            <i onClick={() => this.setState({openEditPlaceDesc: !this.state.openEditPlaceDesc})}
                            className="fa fa-edit edit-i"></i> : null
                        }
                        
                        </p>
                        <p className="group-desc">{this.state.loadedData.description} </p>
                    </Aux>
                }

                

                {isUserInGroup.result ? this.state.showEvents ? <Events 
                events={this.props.loadedGroup.events}
                groupId={this.props.loadedGroup.id}/> : 
                   <Posts 
                   users={this.state.loadedData.userGroups}
                   delFiles={() => this.setState({files: []})} isUserGroupLeader={isUserGroupLeader}
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
        editGroupErrors: state.GroupReducer.editGroupErrors,

        addPictureResult: state.GroupReducer.addPictureResult,
        addPictureErrors: state.GroupReducer.addPictureErrors
    };
}

const mapDispatchToProps = dispatch => {
    return {
        loadGroup: (groupId) => dispatch(loadGroupActionCreator(groupId)),
        joinIntoGroup: (UserId, GroupId) => dispatch(joinIntoGroupActionCreator(UserId, GroupId)),
        deleteGroup: (GroupId, token, history, userId) => dispatch(deleteGroupActionCreator(GroupId, token, history, userId)),
        editGroup: (token, Name, Description, id, loadedGroup, history) => dispatch(editGroupAcionCreator(token, Name, Description, id, loadedGroup, history)),
        addPicture: (picture, groupId, userId, history) => dispatch(addPictureActionCreator(picture, groupId, userId, history))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Group));
