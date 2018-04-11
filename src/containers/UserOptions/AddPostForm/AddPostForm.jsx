import React, { Component } from 'react';
import './AddPostForm.css';
import { connect } from 'react-redux';
import { fetchingGroups, loadGroups } from '../Store/actions';
import GroupsBar from './GroupsBar/GroupsBar';
import { validateInput } from '../Validation/Validation';
import EmptyGroupsModal from '../../../components/UI/EmptyGroupsModal/EmptyGroupsModal';
import AddPictureBar from '../../../components/UI/AddPictureBar/AddPictureBar';
import axios from '../../../axios-groupsconnects';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Backdrop from '../../../components/UI/Backdrop/Backdrop';

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
        sendingPictureSpinner: false
    }
    componentDidMount(){ 
        this.setState({
            loadedGroups: this.mappingFunction(this.props.userObject.userGroups)
        })
    }
    mappingFunction = (objectArray) => {
        let resultArray = Object.keys(objectArray).map(item => {
            return this.props.userObject.userGroups[item].group;
        });
        return resultArray;
    }
    componentDidUpdate(prevProps, prevState){
        if (prevState.responsePostId !== this.state.responsePostId) {
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

    OnDrop = (files) => {
        const correctFormats = ['jpg','jpeg','png'];
        let counter = 0;
        for(let key in correctFormats){
            if(files[0].type === "image/" + correctFormats[key]){
                counter = counter+1;
            }
        }
        if(counter > 0){
            this.setState({files: files});
        }
        else{
            this.setState({incorrectPictureError: "Dodane zdjęcie posiada niedopuszczalny format"});
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
            this.setState({sendingPostSpinner: true});
            const newPost = {
                Title: this.state.postTitle,
                Content: this.state.postContent,
                GroupId: this.state.addedGroups[0].id,
                AuthorId: this.props.userObject.id
            }
            axios.post('/api/posts/add', newPost).then(response => {
                this.setState({responsePostId: response.data.successResult.id, addingPostError: "",
            sendingPostSpinner: false});
            }).catch(error => {
                this.setState({addingPostError: "Wystąpił błąd podczas ładowania", sendingPostSpinner: false});
            })
            
        }   
    }
    AddingPictureOnServer = () => {
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
                
            }).catch(error => {
                
            })
        }
    }
    render(){
        return(
            <div className="add-post-container">
                <Backdrop show={this.state.sendingPostSpinner}>
                    <Spinner />
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
const mapDispatchToProps = dispatch => {
    return {
        fetchingGroups: (groups) => dispatch(fetchingGroups(groups)),
        loadGroups: (groups) => loadGroups(groups)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(AddPostForm);