import React, { Component } from 'react';
import './AddPostForm.css';
import { connect } from 'react-redux';
import { fetchingGroups, loadGroups } from '../Store/actions';
import GroupsBar from './GroupsBar/GroupsBar';
import { validateInput } from '../Validation/Validation';
import EmptyGroupsModal from '../../../components/UI/EmptyGroupsModal/EmptyGroupsModal';
import AddPictureBar from '../../../components/UI/AddPictureBar/AddPictureBar';

class AddPostForm extends Component{
    state = {
        postTitle: "",
        postContent: "",

        addedGroups: [],
        validationResult: [
            {id: "postTitle", content: ""},
            {id: "postContent", content: ""},
            {id: "addedGroups", content: ""}
        ],
        showModalError: false,
        files: [],
        incorrectPictureError: ""
    }
    componentDidMount(){ 
        this.props.fetchingGroups();
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
    Validate = () => {
        let oldState = [...this.state.validationResult];
        oldState[0].content = validateInput(5,15,this.state.postTitle, ["kurcze"], "", "", "tytuł postu");

        oldState[1].content = validateInput(1,250,this.state.postContent, "", "", "","","treśc postu");

        if(this.state.addedGroups.length === 0){
            oldState[2].content = "Zanim opublikujesz post, wybierz grupe";
            this.setState({showModalError: true});
        }
    
        this.setState({validationResult: oldState});
     
        
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
            alert("Siema");
        }
        
    }
    onSubmitHandler = e => {
        e.preventDefault();
        this.Validate();  
        this.AddPostOnServer(); 

    }
    addGroup = (event) => {
        const index = this.props.loadedGroups.findIndex(item => {
            return item.id === event.target.value;
        })
        const oldAdded = [...this.state.addedGroups];
        oldAdded.push(this.props.loadedGroups[index]);
        this.setState({addedGroups: oldAdded});
        this.props.loadGroups(this.props.loadedGroups.splice(index,1));
    }
    deleteGroup = (event) => {
        const index = this.state.addedGroups.findIndex( item => {
            return item.id === event.target.value;
        })
        this.props.loadGroups(this.props.loadedGroups.push(this.state.addedGroups[index]));
        let newGroups = [...this.state.addedGroups];
        newGroups.splice(index, 1);
        this.setState({addedGroups: newGroups});

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
    render(){
        return(
            <div className="add-post-container">
                <h4>Formularz dodawania postów</h4>
                    <p className="block-header">Grupy do wybrania</p>
                    <GroupsBar 
                    targetClass="loaded-groups"
                    clicked={(event) => this.addGroup(event)}
                    groups={this.props.loadedGroups}
                    icon={<i className="fa fa-plus"></i>} />
                    <p className="block-header">Wybrane grupy</p>
                    <GroupsBar 
                    targetClass="added-groups"
                    groups={this.state.addedGroups}
                    icon={<i className="fa fa-trash"></i>}
                    clicked={(event) => this.deleteGroup(event)} />
              
                <p className="block-header">Wypełnij poniższe pola</p>
                <div className="form-holder">
                    <input onChange={(event) => this.onChangeHandlerTitle(event)} 
                    value={this.state.postTitle} type="text" placeholder="Dodaj tytuł postu" />

                    <p style={{
                    width: this.state.validationResult[0].content === "" ? '0' : '100%',
                    opacity: this.state.validationResult[0].content === "" ? '0' : '1'
                    }}>{this.state.validationResult[0].content}</p>  

                    <textarea onChange={(event) => this.onChangeHandlerContent(event)} 
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
        loadedGroups: state.userOptionsRed.loadedGroups
    };
}
const mapDispatchToProps = dispatch => {
    return {
        fetchingGroups: () => dispatch(fetchingGroups()),
        loadGroups: (groups) => loadGroups(groups)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(AddPostForm);