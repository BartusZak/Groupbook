import React, { Component } from 'react';
import CenterComponent from '../../CenterComponent/CenterComponent';
import './Addpost.css';
import axios from '../../../axios-post';
import Spinner from '../../../components/UI/Spinner/Spinner';
import 'font-awesome/css/font-awesome.min.css';
import Modal from '../../../components/UI/Modal/Modal';

class Addpost extends Component{
    state = {
        groupData: [], 
        showSpinner: false,
        groupLoadingError: false,
        groupsToPublic: [],
        numberOfAdded: 0,
        numberOfGroups: 0,

        showModal: false
    }
    componentDidMount(){
        this.generatingGroups();
    }
    generatingGroups(){
        this.setState({showSpinner: true, groupsToPublic: []});
        let oldData = [...this.state.groupData];
        axios.get('/posts/1/comments').then(response => {
            oldData = response.data;
            this.setState({groupData: oldData, showSpinner: false, numberOfAdded: 0, numberOfGroups: oldData.length});
        }).catch(error => {
            this.setState({groupLoadingError: error, showSpinner: false});
        })
    }
    addGroupToPost = (id) => {
        let oldData = [...this.state.groupData];
        const correctValue = oldData.findIndex(p => {
            return p.id === id;
        });
        let oldAdded = [...this.state.groupsToPublic];
        oldAdded.push(oldData[correctValue]);
        oldData.splice(correctValue, 1);
        this.setState({groupData: oldData, groupsToPublic: oldAdded, numberOfAdded: this.state.numberOfAdded+1});
    }

    addAllGroups = () => {
        const concatedArrays = this.state.groupData.concat(this.state.groupsToPublic);
        this.setState({groupsToPublic: concatedArrays, groupData: [], numberOfAdded: concatedArrays.length});     
    }

    hideModal = () => {
        this.setState({showModal: !this.state.showModal});
    }

    render(){
        console.log(this.state.groupsToPublic);
        let GroupItems = ( this.state.groupLoadingError ?
        <h3>Wystąpił problem podczas ładowania treści </h3> : this.state.showSpinner ? <Spinner /> :
        this.state.groupData.map(item => {
            return <li key={item.id} onClick={(id) => this.addGroupToPost(item.id)} className="GroupItem">{item.name} <i className="fa fa-plus-circle"></i></li>
        }) );

        if(this.state.numberOfAdded === this.state.numberOfGroups && !this.state.showSpinner)
            GroupItems = <h3 style={{color: 'green'}}>Dodałeś już wszystkie grupy, do których należysz</h3>;

        const modalContent = !this.state.numberOfAdded > 0 ? <h2>Nie dodano żadnych grup</h2> : <h3>Dodano następujące grupy: </h3>;
        return (
        <div className="Container">
             
             <div className="SelectGroupPlace">
                <h1 style={{marginBottom: '30px'}}>Wybierz grupę docelową</h1>
                <div className="Buttons">
                    <i onClick={() => this.addAllGroups()} className="fa fa-paw"></i>
                    <i className="fa fa-history" onClick={() => this.generatingGroups()}></i>
                    <i className={this.state.numberOfAdded === 0 ? "Numbers EmptyNumber" : "Numbers"}>+{this.state.numberOfAdded}</i>
                    
                    <i onClick={this.hideModal} className="fa fa-columns"></i>
                </div>
                <ul className="PlaceForGroupItems">
                    {GroupItems}
                </ul>
                <button disabled={this.state.numberOfAdded > 0 ? false : true} className="AddPostButton" style={{position: 'initial'}}>Podgląd postu</button>
             </div>
             <div className="Addpost">
                <h1 style={{marginBottom: '30px'}}>Dodaj zdjęcie i wypełnij pola</h1>
                <div className="InputsContainer">
                    <div className="LabelsInputs">
                        <h4>Tytuł postu</h4>
                        <input type="text" placeholder="Dodaj tytuł postu..."/>
                    </div>
                    <div className="LabelsInputs">
                        <h4>Treść postu</h4>
                        <textarea placeholder="Dodaj treść postu...">
                        </textarea>   
                    </div>
                    <input className="AddPhotoInput" type="file" />
                </div>
            </div>
            <Modal heightPosition='40%' show={this.state.showModal} clickedMethod={this.hideModal}>
                {modalContent}
            </Modal>
      
        </div>
       
        );
    }
}

export default Addpost;
