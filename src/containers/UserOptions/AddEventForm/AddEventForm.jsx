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
        redirectToThree: false

    }
    componentDidMount(){
        this.props.fetchingGroups();
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
        newItems[0].error = validateInput(5,15,newItems[0].value,"", "", "","nazwa wydarzenia");
        newItems[1].error = validateInput(5,200,newItems[1].value, "", "", "", "opis wydarzenia");
        newItems[2].error = validateInput("","",newItems[2].value, "", "date", "", "");
        
        if(newItems[0].error !== "" || newItems[1].error !== "" || newItems[2].error !== "")
            this.setState({redirectToThree: false, inputValues: newItems});
        
        if(newItems[0].error === "" && newItems[1].error === "" && newItems[2].error === "")
            this.setState({redirectToThree: true, inputValues: newItems, actualBlock: 3});
        

    }

    comeBackEventHandler = () => {
        this.setState({actualBlock: this.state.actualBlock-1});
    }
    render(){
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
                <i style={{left: this.state.actualBlock <= 1 ? '-100vh' : '0'}} 
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
                        icon={<i className="fa fa-plus"></i>} />
                        <p className="block-header">Wybrane grupy</p>
                        <GroupsBar 
                        targetClass="added-groups"
                        groups={this.state.addedGroups}
                        icon={<i className="fa fa-trash"></i>}
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
                        <textarea onChange={(event) => this.onChangeHandlerInput(event, item.id)}
                        className={this.state.inputValues[item.id].error === "" ? "" : "invalid-inputs"}
                        value={this.state.inputValues[item.id].value}
                        placeholder={item.placeholder}>
                        </textarea> : 
                        <input max="2050-12-31" onChange={(event) => this.onChangeHandlerInput(event, item.id)} 
                        className={this.state.inputValues[item.id].error === "" ? "" : 
                        "invalid-inputs"} value={this.state.inputValues[item.id].value} 
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
                        
                    </EventContentBlock>
                    
                    
                </div>
             
                
                <Modal show={this.state.showValidateModal} clickedMethod={
                    () => this.toogleValidationModal()}>
                    <p className="modal-validate-error">{this.state.validateError}</p>
                    <button onClick={this.toogleValidationModal} className="modal-validate-error-confirm-button">
                        Potwierdzam
                    </button>
                </Modal>
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
export default connect(mapStateToProps, mapDispatchToProps)(AddEventForm);