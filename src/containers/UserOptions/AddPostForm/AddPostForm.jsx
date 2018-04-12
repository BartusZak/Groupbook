import React, { Component } from 'react';
import './AddPostForm.css';
import { connect } from 'react-redux';
import GroupsBar from './GroupsBar/GroupsBar';
import { validateInput, validatePictures } from '../Validation/Validation';
import EmptyGroupsModal from '../../../components/UI/EmptyGroupsModal/EmptyGroupsModal';
import AddPictureBar from '../../../components/UI/AddPictureBar/AddPictureBar';
import axios from '../../../axios-groupsconnects';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Backdrop from '../../../components/UI/Backdrop/Backdrop';
import { withRouter } from 'react-router-dom';

class AddPostForm extends Component{
    state = {
        postTitle: "",
        postContent: "",
        loadedGroups: [],
        addedGroups: [],
        validationResult: [
            {id: "postTitle", content: ""},
            {id: "postContent", content: ""},
            {id: "addedGroups", content: ""}
        ],
        showModalError: false,
        files: [],
        incorrectPictureError: "",

        addingPostError: "",
        responsePostId: null,
        sendingPostSpinner: false,

        addingPictureError: "",
        sendingPictureSpinner: false,

        showBackdrop: false
    }
    componentDidMount(){
        const userGroups = (
            JSON.parse(localStorage.getItem('responseObject')) !== null ? 
            JSON.parse(localStorage.getItem('responseObject')) :
            this.props.userObject
        );
        this.setState({
            loadedGroups: this.mappingFunction(userGroups.userGroups)
        })
    }
    mappingFunction = (objectArray) => {
        let resultArray = Object.keys(objectArray).map(item => {
            return objectArray[item].group;
        });
        return resultArray;
    }
    componentDidUpdate(prevProps, prevState){
        if (prevState.responsePostId !== this.state.responsePostId &&
        this.state.files.length > 0 && this.state.responsePostId !== null) {
            this.AddingPictureOnServer();
        }
    }
    addGroup = (event) => {
        const loadedGroups = [...this.state.loadedGroups];
        const index = loadedGroups.findIndex(item => {
            return item.id === event.target.value;
        })
        const addedGroups = [...this.state.addedGroups];
        addedGroups.push(loadedGroups[index]);
        
        loadedGroups.splice(index, 1);

        this.setState({addedGroups: addedGroups, loadedGroups: loadedGroups});
    }
    deleteGroup = (event) => {
        const addedGroups = [...this.state.addedGroups];
        const loadedGroups = [...this.state.loadedGroups];
        const index = addedGroups.findIndex( item => {
            return item.id === event.target.value;
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
            const responseObject = JSON.parse(localStorage.getItem('responseObject')) !== null ?
            JSON.parse(localStorage.getItem('responseObject')) : this.props.userObject;
            this.setState({sendingPostSpinner: true, showBackdrop: true});
            
            const addedGroupsIds = this.state.addedGroups.map(item => {
                return item.id;
            })
            const newPost = {
                Title: this.state.postTitle,
                Content: this.state.postContent,
                GroupsIds: addedGroupsIds,
                AuthorId: responseObject.id
            }
            axios.post('/api/posts/add', newPost).then(response => {
                this.setState({responsePostId: response.data.successResult.id,
                    addingPostError: "", sendingPostSpinner: false});    
                if(this.state.files.length === 0){
                    this.redirectToAddedPostGroup();
                }
                
               
            }).catch(error => {
                 this.setState({addingPostError: "Wystąpił błąd podczas dodawania postu",
                 sendingPostSpinner: false, responsePostId: null });
            })
        }   
    }
    AddingPictureOnServer = () => {
        this.setState({sendingPictureSpinner: true});
        if(this.state.files.length !== 0 && this.state.responsePostId !== null){
            let formData = new FormData();
            formData.set("postId", this.state.responsePostId);
            formData.set("pictures", this.state.files[0]);
            axios({
                method: 'post',
                url: '/api/posts/addpictures',
                data: formData,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            }).then(response => {
                this.setState({sendingPictureSpinner: false, addingPictureError: ""});
                this.redirectToAddedPostGroup();
            }).catch(error => {
                this.setState({sendingPictureSpinner: false,
                     addingPictureError: "Wystąpił błąd podczas dodawania zdjęcia"});
            })
        }
    }

    closeBackdrop = () => {
        this.setState({showBackdrop: false});
    }
    redirectToAddedPostGroup = () => {
        this.props.history.push('/logged/group/' + 
            this.state.addedGroups[0].name.toLowerCase());
    }
    render(){
        return(
            <div className="add-post-container">
                <Backdrop show={this.state.showBackdrop} 
                clicked={(this.state.addingPostError !== ""
                || this.state.addingPictureError !== "") ? this.closeBackdrop : null}>
                    <div className="backdrop-container">
                        {this.state.sendingPostSpinner ? <Spinner /> :
                        this.state.addingPostError ? 
                        <p className="backdrop-error">
                            {this.state.addingPostError}
                        </p> : null}

                        {this.state.sendingPictureSpinner ? <Spinner /> :
                        this.state.addingPictureError ? 
                        <p className="backdrop-error">
                            {this.state.addingPictureError}
                        </p> : null}
                    </div>
                    
                </Backdrop>
                <h4>Formularz dodawania postów</h4>
                    <p className="block-header">Grupy do wybrania</p>
                    <GroupsBar 
                    targetClass="loaded-groups"
                    clicked={(event) => this.addGroup(event)}
                    groups={this.state.loadedGroups}
                    />
                    <p className="block-header">Wybrane grupy</p>
                    <GroupsBar 
                    targetClass="added-groups"
                    groups={this.state.addedGroups}
                    clicked={(event) => this.deleteGroup(event)} />
              
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
        userObject: state.logRed.loggingObject
    };
}
export default connect(mapStateToProps, null)(withRouter(AddPostForm));