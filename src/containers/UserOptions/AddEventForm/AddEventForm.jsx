import React, { Component } from 'react';
import './AddEventForm.css';
import { connect } from 'react-redux';
import GroupsBar from '../AddPostForm/GroupsBar/GroupsBar';
import { fetchingGroups, loadGroups } from '../Store/actions';
import EventContentBlock from './EventContentBlock/EventContentBlock';
import UniversalForm from '../../../components/UniversalForm/UniversalForm';

const helpArray = [1,2,3];
const array = [
    {id: 0, name: "Nazwa wydarzenia", placeholder: "Wprowadz nazwe wydarzenia...", type: "text", value: "", error: ""},
    {id: 1, name: "Opis wydarzenia", placeholder: "Wprowadz opis wydarzenia...", type: "textarea", value: "", error: ""},
    {id: 2, name: "Data wydarzenia", placeholder: "Wprowadz date wydarzenia...", type: "date", value: "", error: ""}
]
class AddEventForm extends Component{
    state = {
        actualBlock: 1,
        addedGroups: []
    }
    componentDidMount(){
        this.props.fetchingGroups();
    }
    changeActualBlock = (id) => {
        this.setState({actualBlock: id});
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




    render(){
        return(
            <div className="add-event-form-container">
                <h4>Stwórz wydarzenie</h4>
                <nav className="form-navigation">
                    {helpArray.map( item => {
                        return <button onClick={() => this.changeActualBlock(item)} 
                        className={item === this.state.actualBlock ?
                        "" : "unactive-circle"} 
                        key={item}>{item}</button>
                    })}
                </nav>
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

                    <p className="continue-button" onClick={this.state.actualBlock <=3 ? 
                        () => this.changeActualBlock(this.state.actualBlock+1) :
                        alert("Przekierowuje")}>
                        Dalej
                    </p>
                    </EventContentBlock>
                    <EventContentBlock actualBlock={this.state.actualBlock}
                    title="Etap 2: Wypełnij formularz"
                    number={2}>
                        <UniversalForm array={array}/>
                    </EventContentBlock>
                    
                    <EventContentBlock actualBlock={this.state.actualBlock}
                    title="Etap 3: Ustaw wygląd"
                    number={3}>
                        
                    </EventContentBlock>
                    
                    
                </div>
             
                
                
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