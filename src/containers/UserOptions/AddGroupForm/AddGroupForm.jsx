import React, { Component } from 'react';
import './AddGroupForm.css';
import Dropzone from 'react-dropzone';
import { validateInput, validatePictures } from '../../UserOptions/Validation/Validation';
import { connect } from 'react-redux';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { fetchingUsersHandler } from '../Store/actions';
import { withRouter } from 'react-router-dom';

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
        filesErrorType: ""
    }
    
    componentDidMount(){
        this.props.fetchingUsersHandler();
    }
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
        let result = true; //(min, max, inputText, specialKeys, inputType, isZeroAble, inputName)
        formContentCopy[0].groupNameError = validateInput(2,20, 
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
    onSubmitHandler = e => {
        if(this.Validate())
            console.log("jest okej");
            // Przekieruj co tam chcesz
        
        else
            console.log("Nie jest okej");
            // Nie przekieruj 
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
            containsError = "Użytkownik " + this.props.fetchedUsers[id].email + 
            " już istnieje";
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
        return(
            <div className="add-group-form-main-div">
                <h4>Tworzenie nowej grupy</h4>
                <div className="add-group-content-container">
                    <div className="left-form-content">
                        <div className="group-form-section">
                            <label>Nazwa grupy</label>
                            <input onChange={(e) => this.onChangeHandler(e, 0)} 
                            value={this.state.formContent[0].value} 
                            type="text" 
                            placeholder="wpisz nazwę grupy..." />
                            <p className={this.state.formContent[0].groupNameError !== "" ?
                            "validation-error-group animate-in" : "validation-error-group animate-out"}>{this.state.formContent[0].groupNameError}</p>
                        </div>
                        <div className="group-form-section">
                            <label>Opis grupy</label>
                            <textarea onChange={(e) => this.onChangeHandler(e, 1)} 
                            value={this.state.formContent[1].value} 
                            placeholder="wpisz opis grupy..."></textarea>
                            <p className={this.state.formContent[1].groupDescError !== "" ?
                            "validation-error-group animate-in" : "validation-error-group animate-out"}>{this.state.formContent[1].groupDescError}</p>
                        </div>
                    </div>
                    <div className="right-form-content">
                        <label>Dodaj zdjęcie (opcjonalne)</label>
                        
                        <Dropzone
                        disabled={filesLength === 0 ? false : true} 
                        onDrop={file => this.onDropHandler(file)}
                        className={filesLength === 0 ? 
                        "add-group-drop-zone add-group-drop-zone-before-add" : "add-group-drop-zone add-group-drop-zone-after-add"}
                        accept="image/jpeg, image/png, image/jpg">
                            <div>
                                <span className={filesLength === 0 ?
                                 null : "after-add-desc"}>{this.state.filesErrorType !== "" ?
                                 this.state.filesErrorType : filesLength === 0 ? 
                                 "przeciągnij i upuść zdjęcie" 
                                 : "Dodałeś zdjęcie " + this.state.files[0].name +
                                 " " + this.state.files[0].size + " bitów"} </span>

                                 {this.state.files.length > 0 ? <img 
                                 src={this.state.files[0].preview} 
                                 alt={this.state.files[0].name} /> : null }
                            </div>
                            {filesLength > 0 ? <span
                            onClick={this.deleteAddedPictureHandler} 
                            className="delete-added-pic">
                            Usuń zdjęcie</span> : null}

                            
                        </Dropzone>
                        <button onClick={e => this.onSubmitHandler(e)} className="add-new-group-button">Dodaj grupę</button> 
                    </div>
                   
                     
                </div>
                
                <div className="add-users-into-group-container">
                    <h4>W tym bloku możesz dodać użytkowników (opcjonalne)</h4>
                    <div className="loaded-users-cont">
                        <div className="loaded-users">
                            <label>Zaproś użytkownika</label>
                            <input onChange={(event) => this.selectUsers(event)} 
                            value={this.state.searchInput}
                            type="text" placeholder="znajdź użytkownika..."/>
                            <ul>
                                {fetchedUsers.map(item => {
                                    return (<li 
                                    onClick={() => this.addUserHandler(item.id, item)} 
                                    key={item.id}>
                                    {item.email}
                                    </li>);
                                })}
                            </ul>
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
