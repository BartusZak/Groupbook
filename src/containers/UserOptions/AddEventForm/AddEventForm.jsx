import React, { Component } from 'react';
import './AddEventForm.css';
import { connect } from 'react-redux';
import GroupsBar from '../AddPostForm/GroupsBar/GroupsBar';
import { fetchingGroups, loadGroups } from '../Store/actions';
const helpArray = [1,2,3];
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
                    <div className={this.state.actualBlock === 1 ? 
                        "visible-block" : "hidden-block"}>
                        <p className="user-informations">
                            Etap 1: Wybieranie grup
                        </p>
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
                    </div>
                    <div className={this.state.actualBlock === 2 ? 
                        "visible-block" : "hidden-block"}>
                        elo
                    </div>
                    <div className={this.state.actualBlock === 3 ? 
                        "visible-block" : "hidden-block"}>
                        elo1
                    </div>
                    
                </div>
             
                
                <p className="continue-button" onClick={this.state.actualBlock <=3 ? 
                    () => this.changeActualBlock(this.state.actualBlock+1) :
                    alert("Przekierowuje")}>
                    Dalej
                </p>
                
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