import React, { Component } from 'react';
import './AddPostForm.css';
import { connect } from 'react-redux';
import { fetchingGroups, loadGroups } from '../Store/actions';
import 'font-awesome/css/font-awesome.min.css';
import GroupsBar from './GroupsBar/GroupsBar';
class AddPostForm extends Component{
    state = {
        postTitle: "",
        postContent: "",

        addedGroups: [],
        validationResult: []
    }
    componentDidMount(){ 
        this.props.fetchingGroups();
    }
    validateInput = (min, max, inputText, specialKeys, inputType) => {
        const lengthOfInput = inputText.length;

        if(min !== ""){
            if(lengthOfInput < min)
                return "Pole " + inputType + " zawiera mniej niż " + min + " znaków";
            if(lengthOfInput > max)
                return "Pole " + inputType + " zawiera wiecej niż " + max + " znaków";
        }
        if(specialKeys !== ""){
            for(let key in specialKeys){
                if(inputText.includes(key))
                {
                    return "Pole " + inputType + " nie powinno zawierac znaku: " + specialKeys;
                }
            }
        }
        return "";
    }
    onChangeHandlerTitle = event => {
        this.setState({postTitle: event.target.value});
    }
    onChangeHandlerContent = event => {
        this.setState({postContent: event.target.value});
    }
    onSubmitHandler = e => {
        e.preventDefault();
        let oldState = [];

        const inputResult = this.validateInput(5,15,this.state.postTitle, "", "tytuł postu");
        const textAreaResult = this.validateInput(1,250,this.state.postContent, "", "treśc postu");
        
        if(inputResult !== "")
        oldState.push({id: 1, content: inputResult});
        
        if(textAreaResult !== "")
        oldState.push({id: 2, content: textAreaResult});
        
        console.log(inputResult);
        this.setState({validationResult: oldState});
        // Dokonczyc jutro ;/
        
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
                    width: this.state.validationResult.length === 0 ? '0' : '100%',
                    opacity: this.state.validationResult ? '0' : '1'
                    }}>Pole tytul jest nie prawidlowe</p>  

                    <textarea onChange={(event) => this.onChangeHandlerContent(event)} 
                    placeholder="Dodaj treśc postu" value={this.state.postContent}></textarea>

                    <p style={{
                    width: this.state.validationResult.length === 0 ? '0' : '100%',
                    opacity: this.state.validationResult ? '0' : '1'
                    }}>Pole tresc postu jest nie prawidlowe</p> 
                </div>
                <span onClick={e => this.onSubmitHandler(e)} className="add-post-button">
                    Opublikuj
                </span>
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