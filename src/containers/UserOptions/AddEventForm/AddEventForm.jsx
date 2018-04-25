import React, { Component } from 'react';
import './AddEventForm.css';
import { connect } from 'react-redux';
import GroupsBar from '../AddPostForm/GroupsBar/GroupsBar';
import { fetchingGroups, loadGroups } from '../Store/actions';
import EventContentBlock from './EventContentBlock/EventContentBlock';
import './UniversalForm.css';
import { validateInput } from '../Validation/Validation';
import Modal from '../../../components/UI/Modal/Modal';
import 'font-awesome/css/font-awesome.min.css';
import {withRouter} from 'react-router-dom';
import AddPictureBar from '../../../components/UI/AddPictureBar/AddPictureBar';
import EmptyGroupsModal from '../../../components/UI/EmptyGroupsModal/EmptyGroupsModal';
import axios from 'axios/axios-groupsconnects';

const helpArray = [1,2,3];
const array = [
    {id: 0, name: "Nazwa wydarzenia", placeholder: "Wprowadz nazwe wydarzenia...", type: "text", value: "", error: ""},
    {id: 1, name: "Opis wydarzenia", placeholder: "Wprowadz opis wydarzenia...", type: "textarea", value: "", error: ""},
    {id: 2, name: "Data wydarzenia", placeholder: "Wprowadz date wydarzenia...", type: "date", value: "", error: ""}
]
class AddEventForm extends Component{
    state = {
        actualBlock: 1,
        addedGroups: [],
        validateError: "",
        showValidateModal: false,
        inputValues: array,
        redirectToThree: false,

        files: [],
        incorrectPictureError: ""

    }
    
    componentDidMount(){
        this.props.fetchingGroups();
        axios.get("/api/users/" + JSON.parse(localStorage.getItem('responseObject')).id)
            .then( response => {
                console.log(response);
            })
            .catch( error => {
                console.log(error, error.response);
            })
    }
    confirmAddEventHandler = () => {
        this.props.history.push("/logged/group/poczekalnia");
    }

    toogleValidationModal = () => {
        this.setState({showValidateModal: !this.state.showValidateModal});
    }
    changeActualBlock = (id) => {
        const validationResult = validateInput("","","","","groups",this.state.addedGroups.length);
        if(validationResult !== "")
            this.setState({validateError: validationResult, showValidateModal: true});

        else
            this.setState({actualBlock: id, showValidateModal: false});
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

    onChangeHandlerInput = (event, id) => {
        let oldList = [...this.state.inputValues];
        const index = oldList.findIndex( p => {
            return p.id === id;
        })
        oldList[index].value = event.target.value;

        this.setState({inputValues: oldList});
    }
    onSubmitHandler = e => {
        e.preventDefault();
        let newItems = [...this.state.inputValues];
        newItems[0].error = validateInput(2,20, 
            newItems[0].value, ["przeklenstwo"], "", "", "nazwa wydarzenia", "standard");
        newItems[1].error = validateInput(5, 255, 
            newItems[1].value, ["przeklenstwo"], "", "", "opis wydarzenia", "standard");
        newItems[2].error = validateInput("","",newItems[2].value, "", "date", "", "");
        
        if(newItems[0].error !== "" || newItems[1].error !== "" || newItems[2].error !== "")
            this.setState({redirectToThree: false, inputValues: newItems});
        
        if(newItems[0].error === "" && newItems[1].error === "" && newItems[2].error === "")
            this.setState({redirectToThree: true, inputValues: newItems, actualBlock: 3});
    }

    comeBackEventHandler = () => {
        this.setState({actualBlock: this.state.actualBlock-1});
    }
    onDrop = (files) => {
        const correctFormats = ['jpg','jpeg','png'];
        let counter = 0;
        for(let key in correctFormats){
            if(files[0].type === "image/" + correctFormats[key]){
                counter = counter+1;
            }
        }
        if(counter > 0){
            this.setState({files: files, incorrectPictureError: ""});
        }
        else{
            this.setState({incorrectPictureError: "Dodane zdjęcie posiada niedopuszczalny format"});
        }
    }
    deleteFiles = () => {
        this.setState({files: []});
    }
    render(){
        console.log(this.props);
console.log(this.state);
        return(
            <div className="add-event-form-container">
                <h4>Stwórz wydarzenie</h4>
                <nav className="form-navigation">
                    {helpArray.map( item => {
                        return <button className={item === this.state.actualBlock ?
                        "" : "unactive-circle"} 
                        key={item}>{item}</button>
                    })}
                </nav>
                <i style={{left: this.state.actualBlock <= 1 ? '-100vh' : '10px'}} 
                 onClick={this.state.actualBlock > 1 ? this.comeBackEventHandler : null}
                 className="fa fa-arrow-left"></i>
                <div className="event-blocks-container">
                    <EventContentBlock actualBlock={this.state.actualBlock}
                    title="Etap 1: Wybierz grupe"
                    number={1}>
                        <p className="block-header">Grupy do wybrania</p>
                         <GroupsBar 
                        targetClass="loaded-groups"
                        clicked={(event) => this.addGroup(event)}
                        groups={this.props.loadedGroups}
                        />
                        <p className="block-header">Wybrane grupy</p>
                        <GroupsBar 
                        targetClass="added-groups"
                        groups={this.state.addedGroups}
                        clicked={(event) => this.deleteGroup(event)} />

                    <p className="continue-button" onClick={() => this.changeActualBlock(this.state.actualBlock+1)}>
                        Dalej
                    </p>
                    </EventContentBlock>
                    <EventContentBlock actualBlock={this.state.actualBlock}
                    title="Etap 2: Wypełnij formularz"
                    number={2}>
                         <form onSubmit={this.onSubmitHandler} className="universal-form">

                            {this.state.inputValues.map( item => {
                            return (<section key={item.id} className="input-holders">
                            <label>{item.name}</label>
                            {item.type === "textarea" ? 
                            <textarea className={this.state.inputValues[item.id].error !== "" ?
                            "validation-input-error" : null} onChange={(event) => this.onChangeHandlerInput(event, item.id)}
                            value={this.state.inputValues[item.id].value}
                            placeholder={item.placeholder}>
                            </textarea> : 
                            <input className={this.state.inputValues[item.id].error !== "" ?
                            "validation-input-error" : null} max="2050-12-31" onChange={(event) => this.onChangeHandlerInput(event, item.id)} 
                            value={this.state.inputValues[item.id].value} 
                            type={item.type} placeholder={item.placeholder} />}
                            <p className={this.state.inputValues[item.id].error === "" ?
                            "invisible-message" : "invalid-message"}>
                            {this.state.inputValues[item.id].error}</p>
                            </section>);
                            })} 

                            <input className="submit-button" type="submit" value="Dalej" />
                        </form>
                    </EventContentBlock>
                    
                    <EventContentBlock actualBlock={this.state.actualBlock}
                    title="Etap 3: Ustaw wygląd"
                    number={3}>
                     <AddPictureBar
                        mainLabelTitle="Dodaj zdjęcie(opcjonalne)"
                        buttonTitle="Dodaj wydarzenie"
                        filesLength={this.state.files.length}
                        onDropHandler={file => this.onDrop(file)}
                        filesErrorType={this.state.incorrectPictureError}
                        files={this.state.files}
                        deleteAddedPictureHandler={this.deleteFiles}
                        onSubmitHandler={e => this.onSubmitHandler(e)}
                        isGroupForm={false} 
                        height="100%"
                        />
                    </EventContentBlock>
                    
                    
                </div>
                <EmptyGroupsModal 
                showValidateModal={this.state.showValidateModal}
                toogleValidationModal={this.toogleValidationModal}
                validateError={this.state.validateError}
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddEventForm));