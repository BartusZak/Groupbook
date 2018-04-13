import React, { Component } from 'react';
import './AddGroupForm.css';
import Dropzone from 'react-dropzone';
import { validateInput, validatePictures } from '../../UserOptions/Validation/Validation';
import { connect } from 'react-redux';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { fetchingUsersHandler } from '../Store/actions';
import { withRouter } from 'react-router-dom';
import axios from '../../../axios-groupsconnects';
import Backdrop from '../../../components/UI/Backdrop/Backdrop';
import AddPictureBar from '../../../components/UI/AddPictureBar/AddPictureBar';
class AddGroupForm extends Component{
    state = {
        fetchedUsers: null,
        searchInput: "",
        addedUsers: [],
        alreadyExistsError: "",

        formContent: [
            {id: 1, value: "", groupNameError: ""},
            {id: 2, value: "", groupDescError: ""}
        ],

        files: [],
        filesErrorType: "",
        showSpinner: false,

        addingGroupSpinner: false,
        showGroupAddingModal: false,
        addGroupError: ""
    }
    
    componentDidMount(){
        this.changeSpinnerStateHandler();
        this.props.fetchingUsersHandler();
    }
    componentDidUpdate(prevProps, prevState){
        if (prevProps.fetchedUsers !== this.props.fetchedUsers 
            || prevProps.fetchingUsersError !== this.props.fetchingUsersError) {
            this.setState({showSpinner: false});
        }
    }
    changeSpinnerStateHandler = () => this.setState({showSpinner: !this.state.showSpinner});
    onChangeHandler = (e, id) => {
        let formContentCopy = [
            ...this.state.formContent
        ]
        formContentCopy[id].value = e.target.value;
        this.setState({formContent: formContentCopy});
    }
    Validate = () => {
        let formContentCopy = [
            ...this.state.formContent
        ]
        let result = true;
        formContentCopy[0].groupNameError = validateInput(2,120, 
            formContentCopy[0].value, ["przeklenstwo"], "", "", "Nazwa grupy", "standard");

        formContentCopy[1].groupDescError = validateInput(5, 255, 
            formContentCopy[1].value, ["przeklenstwo"], "", "", "Opis grupy", "standard");

        if(formContentCopy[0].groupNameError !== "" 
        || formContentCopy[1].groupDescError !== ""){
            result = false;
        }
        else{
            result = true;
        }
        this.setState({formContent: formContentCopy});
        return result;
    }

    addGroupHandler = () => {
        this.setState({addingGroupSpinner: true, showGroupAddingModal: true});
        const newGroup = {
            Name: this.state.formContent[0].value,
            Description: this.state.formContent[1].value
        }
        axios.post('/api/groups/add', newGroup).then(response => {
            this.setState({addingGroupSpinner: false, addGroupError: ""});
            this.props.history.push("/logged/group/"+ newGroup.Name);
        }).catch(error => {
            this.setState({addingGroupSpinner: false, addGroupError: "Wystąpił błąd podczas dodawania grupy"});
        })
    }
    closeModalHandler = () => {
        this.setState({showGroupAddingModal: false});
    }
    onSubmitHandler = e => {
        if(this.Validate()){
            this.addGroupHandler();
        }
    }
    onDropHandler = file => {
        const result = validatePictures(file[0].type, 200000, file[0].size);
        if(result === ""){
            this.setState({files: file});
        }
        this.setState({filesErrorType: result}); 
    }
    deleteAddedPictureHandler = () => { this.setState({files: []}); }

    selectUsers = event => {
        console.log(this.props.fetchedUsers);
        const fetchedUsers = [...this.props.fetchedUsers];
        let newListFetchedUsers = [];
        for(let key in fetchedUsers){
            if(fetchedUsers[key].email.search(event.target.value) !== -1){
                newListFetchedUsers.push(fetchedUsers[key]);
            }
        }
        this.setState({searchInput: event.target.value, fetchedUsers: newListFetchedUsers});
    }
    addUserHandler = (id, item) => {
        const addedUsers = [...this.state.addedUsers];
        let containsError = "";
        const alreadyContains = addedUsers.findIndex(p => {
            return p.id === id;
        })
        if(alreadyContains === -1){
            addedUsers.push(item);
        }
        else{
            containsError = "Użytkownik " + item.email + 
            " już jest dodany";
            alert(containsError);
            
        }
        const wholeList = [...this.state.fetchedUsers === null 
            ? this.props.fetchedUsers : this.state.fetchedUsers];

        const indexOfItem = wholeList.findIndex(p => {
            return p.id === id;
        })

        if(indexOfItem > -1){
            wholeList.splice(indexOfItem, 1);
        } 
        this.setState({addedUsers: addedUsers, fetchedUsers: wholeList, alreadyExistsError: containsError});
    }

    removeUserHandler = (id) => {
        const addedUsers = [...this.state.addedUsers];
        const indexOfItems = addedUsers.findIndex(p => {
            return p.id === id;
        })
        if(indexOfItems > -1){
            addedUsers.splice(indexOfItems, 1);
        }
        this.setState({addedUsers: addedUsers});
    }

    render(){
        const filesLength = this.state.files.length;
        const fetchedUsers = this.state.fetchedUsers === null ? 
              this.props.fetchedUsers : this.state.fetchedUsers;

        const trueContent = this.state.showSpinner ? <Spinner /> : (this.props.fetchingUsersError ? 
            <p>Błąd podczas ładowania danych</p> : <ul>
            {fetchedUsers.map(item => {
                return (<li 
                onClick={() => this.addUserHandler(item.id, item)} 
                key={item.id}>
                {item.email}
                </li>);
            })}
        </ul>);
        return(
            <div className="add-group-form-main-div">
                <Backdrop show={this.state.showGroupAddingModal} clicked={this.closeModalHandler}>
                    {this.state.addingGroupSpinner ? <Spinner /> : this.state.addGroupError !== "" ?
                    <p className="backdropo-error">{this.state.addGroupError}</p> 
                    : <p className="backdropo-error">"Dodano grupe"</p>}
                </Backdrop>

                <h4>Tworzenie nowej grupy</h4>
                <div className="add-group-content-container">
                    <div className="left-form-content">
                        <div className="group-form-section">
                            <label>Nazwa grupy</label>
                            <input className={this.state.formContent[0].groupNameError !== "" ?
                            "validation-input-error" : null} onChange={(e) => this.onChangeHandler(e, 0)} 
                            value={this.state.formContent[0].value} 
                            type="text" 
                            placeholder="wpisz nazwę grupy..." />
                            <p className={this.state.formContent[0].groupNameError !== "" ?
                            "validation-error-group animate-in" : "validation-error-group animate-out"}>{this.state.formContent[0].groupNameError}</p>
                        </div>
                        <div className="group-form-section">
                            <label>Opis grupy</label>
                            <textarea className={this.state.formContent[1].groupDescError !== "" ?
                            "validation-input-error" : null} onChange={(e) => this.onChangeHandler(e, 1)} 
                            value={this.state.formContent[1].value} 
                            placeholder="wpisz opis grupy..."></textarea>
                            <p className={this.state.formContent[1].groupDescError !== "" ?
                            "validation-error-group animate-in" : "validation-error-group animate-out"}>{this.state.formContent[1].groupDescError}</p>
                        </div>
                    </div>
                    <AddPictureBar
                    mainLabelTitle="Dodaj zdjęcie(opcjonalne)"
                    buttonTitle="Dodaj grupę"
                    filesLength={filesLength}
                    onDropHandler={file => this.onDropHandler(file)}
                    filesErrorType={this.state.filesErrorType}
                    files={this.state.files}
                    deleteAddedPictureHandler={this.deleteAddedPictureHandler}
                    onSubmitHandler={e => this.onSubmitHandler(e)}
                    isGroupForm={true}
                    height="410px"                  
                    /> 
                        
                   
                     
                        
                </div>
                
                <div className="add-users-into-group-container">
                    <h4>W tym bloku możesz dodać użytkowników (opcjonalne)</h4>
                    <div className="loaded-users-cont">
                        <div className="loaded-users">
                            <label>Zaproś użytkownika</label>
                            <input onChange={(event) => this.selectUsers(event)} 
                            value={this.state.searchInput}
                            type="text" placeholder="znajdź użytkownika..."/>
                            {trueContent}
                            
                        </div>
                        <div className="added-users">
                            <label>Aktualnie dodani</label>
                            <ul>
                                {this.state.addedUsers.map( item => {
                                    return (
                                        <li 
                                        key={item.id} 
                                        onClick={() => this.removeUserHandler(item.id)}>
                                            {item.email}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                    
                </div>
                
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        fetchedUsers: state.userOptionsRed.fetchedUsers,
        fetchingUsersError: state.userOptionsRed.fetchingUsersError
    };
}
const mapDispatchToProps = dispatch => {
    return {
        fetchingUsersHandler: () => dispatch(fetchingUsersHandler())
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddGroupForm));
