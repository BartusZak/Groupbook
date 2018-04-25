import React, { Component } from 'react';
import './AddPostForm.css';
import { connect } from 'react-redux';
import GroupsBar from './GroupsBar/GroupsBar';
import { validateInput, validatePictures } from '../Validation/Validation';
import EmptyGroupsModal from '../../../components/UI/EmptyGroupsModal/EmptyGroupsModal';
import AddPictureBar from '../../../components/UI/AddPictureBar/AddPictureBar';
import axios from 'axios/axios-groupsconnects';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Backdrop from '../../../components/UI/Backdrop/Backdrop';
import { withRouter } from 'react-router-dom';
import { fetchUserGroupsActionCreator, addPostActionCreator } from '../../../store/Posts/Actions';

import ErrorPrompt from '../../../components/UI/ErrorPromptMessage/ErrorPromptMessage';

class AddPostForm extends Component{
    state = {
        postTitle: "",
        postContent: "",
        loadedGroups: [],
        addedGroups: [],
        loadGroupSpinner: true,

        validationResult: [
            {id: "postTitle", content: ""},
            {id: "postContent", content: ""},
            {id: "addedGroups", content: ""}
        ],
        showModalError: false,
        files: [],
        incorrectPictureError: "",

        showBackdrop: false,
        addPostSpinner: false
    }
    componentDidMount(){
        const loggedUserData = JSON.parse(localStorage.getItem('responseObject'));
        this.props.fetchUserGroups(loggedUserData.id);
    }
   
    componentDidUpdate(prevProps){
        if(prevProps.userGroups !== this.props.userGroups){
            this.setState({loadedGroups: this.props.userGroups, loadGroupSpinner: false});
        }
        if(prevProps.addPostErrors !== this.props.addPostErrors){
            this.setState({addPostSpinner: false});
        }
    }
    addGroup = event => {
        const loadedGroups = [...this.state.loadedGroups];
        const index = loadedGroups.findIndex(item => {
            return item.group.id === event.target.value;
        })
        const addedGroups = [...this.state.addedGroups];
        addedGroups.push(loadedGroups[index]);
        
        loadedGroups.splice(index, 1);

        this.setState({addedGroups: addedGroups, loadedGroups: loadedGroups});
    }
    deleteGroup = event => {
        const addedGroups = [...this.state.addedGroups];
        const loadedGroups = [...this.state.loadedGroups];
        const index = addedGroups.findIndex( item => {
            return item.group.id === event.target.value;
        });

        loadedGroups.push(addedGroups[index]);
        addedGroups.splice(index, 1);
        this.setState({addedGroups: addedGroups, loadedGroups: loadedGroups});
    }

    toogleValidationModal = () => {
        this.setState({showModalError: !this.state.showModalError});
    }


    onChangeHandlerTitle = event => {
        this.setState({postTitle: event.target.value});
    }
    onChangeHandlerContent = event => {
        this.setState({postContent: event.target.value});
    }

    onSubmitHandler = e => {
        e.preventDefault();
        this.Validate();  
        this.setState({addPostSpinner: true, showBackdrop: true});
        this.AddPostOnServer(); 
    }

    Validate = () => {
        let oldState = [...this.state.validationResult];
        oldState[0].content = validateInput(2,100, 
            this.state.postTitle, ["przeklenstwo"], "", "", "tytuł postu", "standard");

        oldState[1].content = validateInput(5, 255, 
            this.state.postContent, ["przeklenstwo"], "", "", "treść postu", "standard");
         
        oldState[2].content = "";
        if(this.state.addedGroups.length === 0){
            oldState[2].content = "Zanim opublikujesz post, wybierz grupe";
            this.setState({showModalError: true});
        }
        this.setState({validationResult: oldState});
    }

    OnDrop = files => {
        const validationResult = validatePictures(files[0].type, 300000, files[0].size);
        if(!validationResult){
            this.setState({files: files, incorrectPictureError: ""});
        }
        else{
            this.setState({incorrectPictureError: validationResult});
        }
    }
    deleteFiles = () => {
        this.setState({files: []});
    }

    AddPostOnServer = () => {
        const result = {
            ...this.state.validationResult
        }
        
        let booleanResult = true;
        for(let key in result){
            if(result[key].content !== ""){
                booleanResult = false;
            }
        }
        if(booleanResult){
            const responseObject = JSON.parse(localStorage.getItem('responseObject'));
            this.props.addPost(this.state.files, this.state.addedGroups,
                 this.state.postTitle, this.state.postContent, responseObject.id,
                 this.props.history, this.state.addedGroups[0].group.id);
        }   
    }
    closeBackdrop = () => {
        this.setState({showBackdrop: false});
    }
  
    render(){
        return(
            <div className="add-post-container">
                <Backdrop show={this.state.showBackdrop} 
                clicked={this.props.addPostErrors.length > 0 ? this.closeBackdrop : null}>
                    {this.state.addPostSpinner ? <Spinner /> : this.props.addPostErrors.length > 0 ?
                    <ErrorPrompt color="red" message={this.props.addPostErrors[0]} /> : null}
                </Backdrop>

                <h4>Formularz dodawania postów</h4>
                    <p className="block-header">Grupy do wybrania</p>
            
                    {this.state.loadGroupSpinner ? <Spinner /> : 
                    this.props.userGroupsErrors.length > 0 ?
                    <ErrorPrompt color="red" message={this.props.userGroupsErrors[0]} /> :

                    <GroupsBar 
                    targetClass="loaded-groups"
                    clicked={event => this.addGroup(event)}
                    groups={this.state.loadedGroups}
                    />
                    }
                    
                    <p className="block-header">Wybrane grupy</p>
                    <GroupsBar 
                    targetClass="added-groups"
                    groups={this.state.addedGroups}
                    clicked={event => this.deleteGroup(event)} />
              
                <p className="block-header">Wypełnij poniższe pola</p>
                
                <div className="form-holder">
                    <input className={this.state.validationResult[0].content !== "" ?
                    "validation-input-error" : null} onChange={(event) => this.onChangeHandlerTitle(event)} 
                    value={this.state.postTitle} type="text" placeholder="Dodaj tytuł postu" />

                    <p style={{
                    width: this.state.validationResult[0].content === "" ? '0' : '100%',
                    opacity: this.state.validationResult[0].content === "" ? '0' : '1'
                    }}>{this.state.validationResult[0].content}</p>  

                    <textarea className={this.state.validationResult[1].content !== "" ?
                    "validation-input-error" : null} onChange={(event) => this.onChangeHandlerContent(event)} 
                    placeholder="Dodaj treśc postu" value={this.state.postContent}></textarea>

                    <p style={{
                    width: this.state.validationResult[1].content === "" ? '0' : '100%',
                    opacity: this.state.validationResult[1].content === "" ? '0' : '1'
                    }}>{this.state.validationResult[1].content}</p> 
                </div>
                <div className="picture-holder-group-block">
                    <AddPictureBar
                    mainLabelTitle="Dodaj zdjęcie(opcjonalne)"
                    buttonTitle="Dodaj post"
                    filesLength={this.state.files.length}
                    onDropHandler={file => this.OnDrop(file)}
                    filesErrorType={this.state.incorrectPictureError}
                    files={this.state.files}
                    deleteAddedPictureHandler={this.deleteFiles}
                    onSubmitHandler={e => this.onSubmitHandler(e)}
                    isGroupForm={false}
                    height="90%"
                    />  
                </div>
                   

                <EmptyGroupsModal 
                showValidateModal={this.state.showModalError}
                toogleValidationModal={this.toogleValidationModal}
                validateError="Powinieneś dodać przynajmniej jedną grupę"
               />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {

        userGroups: state.PostsReducer.userGroups,
        userGroupsErrors: state.PostsReducer.userGroupsErrors,

        addPostErrors: state.PostsReducer.addPostErrors
    };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchUserGroups: (userId) => dispatch(fetchUserGroupsActionCreator(userId)),
        addPost: (files, addedGroups, postTitle, postContent, authorId, history, groupToPush) => 
            dispatch(addPostActionCreator (files, addedGroups, postTitle, postContent, authorId, history, groupToPush))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddPostForm));