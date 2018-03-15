import React, { Component } from 'react';
import CenterComponent from '../../CenterComponent/CenterComponent';
import './Addpost.css';
import axios from '../../../axios-post';
import Spinner from '../../../components/UI/Spinner/Spinner';



import 'font-awesome/css/font-awesome.min.css';
class Addpost extends Component{
    state = {
        groupData: [], 
        showSpinner: false,
        groupLoadingError: false,

        groupsToPublic: []
      

    }

    componentDidMount(){
        this.generatingGroups();
    }
    generatingGroups(){
        this.setState({showSpinner: true, groupsToPublic: []});
        let oldData = [...this.state.groupData];
        axios.get('/posts/1/comments').then(response => {
            oldData = response.data;
            this.setState({groupData: oldData, showSpinner: false});
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
        this.setState({groupData: oldData, groupsToPublic: oldAdded});
    }

    render(){
        const GroupItems = ( this.state.groupLoadingError ?
        <h3>Wystąpił problem podczas ładowania treści : ( </h3> : this.state.showSpinner ? <Spinner /> :
        this.state.groupData.map(item => {
            return <li key={item.id} onClick={(id) => this.addGroupToPost(item.id)} className="GroupItem">{item.name} <i className="fa fa-plus-circle"></i></li>
        }) );

 
        return (
        <div className="Container">
             <div className="SelectGroupPlace">
                <h1 style={{marginBottom: '30px'}}>Wybierz grupę docelową</h1>
                <ul className="PlaceForGroupItems">
                    {GroupItems}
                </ul>
                <div className="Buttons">
                    <button className="AddPostButton" style={{position: 'initial'}}>Opublikuj</button>
                    <i className="fa fa-history" onClick={() => this.generatingGroups()}></i>
                </div>
               
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
          
            <p>{this.state.lastAdded}</p>
        </div>
       
        );
    }
}

export default Addpost;
