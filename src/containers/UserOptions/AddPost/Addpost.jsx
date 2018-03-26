import React, { Component } from 'react';
import Aux from '../../../hoc/Auxi';
import axios from '../../../axios-post';
import Spinner from '../../../components/UI/Spinner/Spinner';
import 'font-awesome/css/font-awesome.min.css';
import Modal from '../../../components/UI/Modal/Modal';
import GroupList from '../../../components/UI/GroupList/GroupList';
import { connect } from 'react-redux';
import { changingPostTitle, changingPostContent, redirectingToTrue} from '../Store/actions';
import secondAxios from '../../../axios-firebase';
import { AddingPostsErrors } from '../../../components/NamesForForms/Names';
import AddPostAfterSend from './AddPostAfterSend/AddPostAfterSend';
import {withRouter} from "react-router-dom";

import { Row, Col } from 'react-bootstrap';

import { SelectGroup, MainForm } from './AddPost.style';

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
    hideModal = () => { this.setState({showModal: false});}

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
    goBackAndClear = () => { this.props.redirectingToTrue(false); this.setState({numberOfAdded: 0, groupsToPublic: []} ); this.props.changeTitleInput(""); this.props.changeContentInput("");  this.generatingGroups();}

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
                postContent: this.props.postContentArea,
                addDate: new Date().toLocaleString(),
                userName: this.props.userName
            };
            secondAxios.post('/posts.json', ItemToAdd).then(response => {
                this.setState({postShowError: false, postShowSpinner: false});
            }).catch(error => {
                this.setState({postShowError: true, postShowSpinner: false});
            });
    }

    goToPostPage = () => { this.props.history.push("/logged/posts"); }

    
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

        const afterPublishContent = this.state.postShowError ? <AddPostAfterSend error={true} title="Wystąpił problem podczas przesyłania postu" goToPostPage={() => this.goToPostPage()} SendAgain={() => this.publishPost()} backToAdding={() => this.goBackAndClear()}/>:
        this.state.postShowSpinner ? <Aux><h2>Trwa dodawanie postu...</h2><Spinner /></Aux> : <AddPostAfterSend error={false} title="Post został dodany" backToAdding={() => this.goBackAndClear()} goToPostPage={() => this.goToPostPage()}/>;
        
        return (
        // <div className="Container">
        <Row style={{ padding: "20px", height: "80vh", backgroundColor: 'white'}}>
            <Col xs={12} md={12} lg={6}>
                <SelectGroup>
                    <h2 style={{marginBottom: '30px'}}>Wybierz grupę docelową</h2>
                    <div className="Buttons">
                        <div className="selectAllIcons" onClick={() => this.addAllGroups()} title="Wybierz wszystko">
                            <i className="fa fa-square"            style={{position: "absolute", top: "0px", left: "0px"}}/>
                            <i className="fa fa-square fa-inverse" style={{position: "absolute", top: "2px", left: "2px"}}/>
                            <i className="fa fa-check-square"      style={{position: "absolute", top: "3px", left: "3px"}}/>
                        </div>
                        <div className="unSelectAllIcons" onClick={() => this.generatingGroups()} title="Odznacz wszystko">
                            <i className="fa fa-square"            style={{position: "absolute", top: "0px", left: "0px"}}/>
                            <i className="fa fa-square fa-inverse" style={{position: "absolute", top: "2px", left: "2px"}}/>
                            <i className="fa fa-check-square"      style={{position: "absolute", top: "3px", left: "3px"}}/>
                            <i className="fa fa-square"            style={{position: "absolute", top: "3px", left: "3px"}}/>
                        </div>
                        <span className={this.state.numberOfAdded === 0 ? "Numbers EmptyNumber" : "Numbers"}>+{this.state.numberOfAdded}</span>
                        <i onClick={this.openOrCloseModal} className="fa fa-info-circle" title="Dodane grupy"></i>
                    </div>
                    <ul className="PlaceForGroupItems">
                        {GroupItems}
                    </ul>
                    <button onClick={this.publishPost} disabled={DisablingButton} className="AddPostButton" style={{position: 'initial'}}>Opublikuj</button>
                </SelectGroup>
            </Col>
            <Col className="SpaceForDesktop" xs={12} md={12} lg={6}>
                <MainForm>
                    <h2 style={{marginBottom: '30px'}}>Dodaj zdjęcie i wypełnij pola</h2>
                    <input maxLength="100" value={this.props.postTitleInput} onChange={ (event) => this.props.changeTitleInput(event.target.value) } type="text" placeholder="Tytuł"/>
                    {this.props.postTitleInput.length < 5 ? <span style={{margin: "-10px 0 10px", display: "block", color: 'red'}}>{AddingPostsErrors[0].msg}</span>: ""}
                    <textarea maxLength="500" value={this.props.postContentArea} onChange={(event) => this.props.changeContentInput(event.target.value)} placeholder="Treść">
                    </textarea> 
                    {this.props.postContentArea.length < 5 ? <span style={{margin: "-10px 0 10px", display: "block", color: 'red'}}>{AddingPostsErrors[1].msg}</span>: ""}
                    <label className="btn btn-success">
                        Dodaj zdjęcie<input type="file" hidden/>
                    </label>
                </MainForm>
             </Col>
            <Modal show={this.state.showModal} clickedMethod={this.hideModal}>
                {modalContent}
            </Modal>
            <Modal show={this.props.isRedirecting} clickedMethod={(!this.state.postShowSpinner || this.state.postShowError) ? this.goBackAndClear : null}>
                {afterPublishContent}
            </Modal>
        
        </Row>
        // </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        postTitleInput: state.userOptionsRed.postTitleInput,
        postContentArea: state.userOptionsRed.postContentArea,
        isRedirecting: state.userOptionsRed.isRedirecting,
        userName: state.logRed.userName
    };
}
const mapDispatchToProps = dispatch => {
    return {
        changeTitleInput: (val) => dispatch(changingPostTitle(val)),
        changeContentInput: (val) => dispatch(changingPostContent(val)),
        redirectingToTrue: (val) => dispatch(redirectingToTrue(val))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Addpost));

// Zrobic jutro walidacje tych durnych pol wkoncu
