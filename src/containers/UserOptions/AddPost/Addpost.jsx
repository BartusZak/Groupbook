import React, { Component } from 'react';
import CenterComponent from '../../CenterComponent/CenterComponent';
import './Addpost.css';
import Aux from '../../../hoc/Auxi';
import axios from '../../../axios-post';
import Spinner from '../../../components/UI/Spinner/Spinner';
import 'font-awesome/css/font-awesome.min.css';
import Modal from '../../../components/UI/Modal/Modal';
import GroupList from '../../../components/UI/GroupList/GroupList';
import { connect } from 'react-redux';
import { changingPostTitle, changingPostContent, redirectingToTrue} from '../Store/actions';
import secondAxios from '../../../axios-firebase';
import '../../../components/Form/FormStyles.css';
import { AddingPostsErrors } from '../../../components/NamesForForms/Names';
import { ValidationBubble } from './Form.style';
class Addpost extends Component{
    state = {
        groupData: [], 
        showSpinner: false,
        groupLoadingError: false,
        groupsToPublic: [],
        numberOfAdded: 0,
        numberOfGroups: 0,
        showModal: false,

        postShowSpinner: false,
        postShowError: false

    }
    componentDidMount(){ this.generatingGroups(); }
    openOrCloseModal = () => { this.setState({showModal: !this.state.showModal}) }
    hideModal = () => { this.setState({showModal: false, groupsToPublic: [], numberOfAdded: 0}); this.props.redirectingToTrue(false);  this.props.changeTitleInput(""); this.props.changeContentInput("");}
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

    publishPost = () => {
            this.props.redirectingToTrue(true);
            this.setState({postShowSpinner: true, postShowError: false});
            const ItemToAdd = {
                groups: this.state.groupsToPublic,
                postTitle: this.props.postTitleInput,
                postContent: this.props.postContentArea
            };
            secondAxios.post('/posts.json', ItemToAdd).then(response => {
                this.setState({postShowError: false, postShowSpinner: false})
            }).catch(error => {
                    this.setState({postShowError: true, postShowSpinner: false});
            });
    }

    render(){
        let GroupItems = ( this.state.groupLoadingError ?
        <h3>Wystąpił problem podczas ładowania treści </h3> : this.state.showSpinner ? <Spinner /> :
        this.state.groupData.map(item => {
            return <li key={item.id} onClick={(id) => this.addGroupToPost(item.id)} className="GroupItem">{item.name} <i className="fa fa-plus-circle"></i></li>
        }) );

        if(this.state.numberOfAdded === this.state.numberOfGroups && !this.state.showSpinner)
            GroupItems = <h3 style={{color: 'green'}}>Dodałeś już wszystkie grupy, do których należysz</h3>;

        const modalContent = !this.state.numberOfAdded > 0 ? <h2>Nie dodano żadnych grup</h2> : <GroupList addedGroups={this.state.groupsToPublic} />;
        const DisablingButton = !this.state.numberOfAdded > 0 ? true : false 
        || this.props.postTitleInput.length < 5 ? true : false || this.props.postContentArea.length < 5 ? true : false;

        const afterPublishContent = this.state.postShowError ? <h2>Wystąpił błąd podczas przesyłania postu na serwer</h2>:
        this.state.postShowSpinner ? <Aux><h2>Trwa dodawanie postu...</h2><Spinner /></Aux> : <h2>Post został pomyślnie dodany</h2>;
        // Dodac dwa przyciski do publikowania postu raz jeszcze oraz do przechodzena do strony z postami
        
        

        return (
        <div className="Container">
             <div className="SelectGroupPlace">
                <h1 style={{marginBottom: '30px'}}>Wybierz grupę docelową</h1>
                <div className="Buttons">
                    <i onClick={() => this.addAllGroups()} className="fa fa-paw"></i>
                    <i className="fa fa-history" onClick={() => this.generatingGroups()}></i>
                    <i className={this.state.numberOfAdded === 0 ? "Numbers EmptyNumber" : "Numbers"}>+{this.state.numberOfAdded}</i>
                    <i onClick={this.openOrCloseModal} className="fa fa-columns"></i>
                </div>
                <ul className="PlaceForGroupItems">
                    {GroupItems}
                </ul>
                <button onClick={this.publishPost} disabled={DisablingButton} className="AddPostButton" style={{position: 'initial'}}>Opublikuj</button>
             </div>
             <div className="MainForm" style={{width: '45%'}}>
                    <h1 style={{marginBottom: '30px'}}>Dodaj zdjęcie i wypełnij pola</h1>
                    <input maxLength="100" value={this.props.postTitleInput} onChange={ (event) => this.props.changeTitleInput(event.target.value) } type="text" placeholder="Dodaj tytuł postu... (minimalnie 5 znaków)"/>
                    {this.props.postTitleInput.length < 5 ? <ValidationBubble><span>{AddingPostsErrors[0].msg}</span></ValidationBubble>: ""}
                    <textarea maxLength="500" value={this.props.postContentArea} onChange={(event) => this.props.changeContentInput(event.target.value)} placeholder="Dodaj treść postu... (minimalnie 5 znaków)">
                    </textarea> 
                    {this.props.postContentArea.length < 5 ? <ValidationBubble><span>{AddingPostsErrors[1].msg}</span></ValidationBubble>: ""}
                    <input className="AddPhotoInput" type="file" />
             </div>
            <Modal show={this.state.showModal} clickedMethod={this.hideModal}>
                {modalContent}
            </Modal>
            <Modal show={this.props.isRedirecting} clickedMethod={(!this.state.postShowSpinner || this.state.postShowError) ? this.hideModal : null}>
                {afterPublishContent}
            </Modal>

        </div>
       
        );
    }
}
const mapStateToProps = state => {
    return {
        postTitleInput: state.userOptionsRed.postTitleInput,
        postContentArea: state.userOptionsRed.postContentArea,
        isRedirecting: state.userOptionsRed.isRedirecting
    };
}
const mapDispatchToProps = dispatch => {
    return {
        changeTitleInput: (val) => dispatch(changingPostTitle(val)),
        changeContentInput: (val) => dispatch(changingPostContent(val)),
        redirectingToTrue: (val) => dispatch(redirectingToTrue(val))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Addpost);

// Zrobic jutro walidacje tych durnych pol wkoncu
