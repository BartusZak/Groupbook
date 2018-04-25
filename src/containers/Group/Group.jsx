import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import './Group.css';
import GroupLeftSideBar from '../../components/GroupLeftSideBar/GroupLeftSideBar';
import Modal from '../../components/UI/Modal/Modal';
import OpenedMessage from '../../components/UI/OpenedMessage/OpenedMessage';
import Back from '../../assets/img/groupimages/back.jpg';
import Events from '../../components/Events/Events';
import Posts from '../../components/Posts/Posts';
import { connect } from 'react-redux';
import axios from 'axios/axios-groupsconnects';
import { withRouter } from 'react-router-dom';
import Spinner from '../../components/UI/Spinner/Spinner';
import { concatingUrlTitle } from '../../helperMethods/helperMethods';
import AddGroupMessage from '../../components/UI/ErrorPromptMessage/ErrorPromptMessage';
import Transition from 'react-transition-group/Transition';
import {apiPicturesUrl} from 'axios/apiPicturesUrl';

class Group extends Component{
   
    state = {
        showEvents: false,
        showPosts: true,
        showSendMessageToOwnerModal: false,

        loadingGroupDataSpinner: false,
        loadingGroupDataError: false,
        loadedData: [],

        loadingPostsError: false,
        loadingPostsSpinner: false,
        loadedPosts: [],

        succOperationPrompt: false
    }
    componentDidMount(){ 
        this.fetchingPosts();
        if(this.props.history.location.state){
            this.setState({ succOperationPrompt: true });
            setTimeout(() => {
                this.setState({ succOperationPrompt: false });
              }, 3000);
        }
    }
    componentDidUpdate(){
        
    }
    fetchingPosts = () => {
        this.setState({loadingGroupDataSpinner: true});
        const url = concatingUrlTitle(this.props.location);

        axios.get('/api/groups' + url).then(response => {
            this.setState({loadingGroupDataSpinner: false, loadingGroupDataError: "", 
                loadedData: response.data, loadedPosts: response.data.posts, loadingPostsSpinner: false
                });
        }).catch(error => {
            this.setState({loadingGroupDataSpinner: false, loadingPostsSpinner: false,
                 loadingGroupDataError: "Wystąpił błąd podczas ładowania danych", 
                 loadingPostsError: "Wystąpił błąd podczas ładowania postów"
                });
        })
    }
    showEventsClickHandler = () => { this.setState({showEvents: true, showPosts: false}); }
    showPostsClickHandler = () => { 
        this.setState({showEvents: false, showPosts: true});
        this.fetchingPosts();
    }
    modalShowClickHandler = () => { this.setState({showSendMessageToOwnerModal: 
        !this.state.showSendMessageToOwnerModal}); }



    render(){
        
        return(
            <div className="background-container">
                <Transition 
                    mountOnEnter 
                    unmountOnExit 
                    in={this.state.succOperationPrompt}
                    timeout={500}>
                        {state => (
                             <AddGroupMessage 
                             color="green"
                             message={"Poprawnie dodano"}
                             animationType={this.state.succOperationPrompt ? "succ-add-group-message-in"
                         : "succ-add-group-message-out"}/>
                        )}
                </Transition>


                <div className="left-trash-container">
                    {this.state.loadingGroupDataSpinner ? 
                    <Spinner /> 
                    : <GroupLeftSideBar 
                    users={this.state.loadedData.userGroups}
                    loadingUsersError={this.state.loadingGroupDataError} />}
                    
                </div>
                
                <div className="group-container">
                    

                    <p className="group-title-full">{this.state.loadedData.name}</p>
                    {this.state.loadingGroupDataError ? 
                    <p className="backdropo-error">Wystąpił błąd podczas ładowania danych grupy</p> :
                        <nav style={{backgroundImage: `url(${this.state.loadedData.picture ? 
                            apiPicturesUrl + 
                            this.state.loadedData.picture.fullResolutionPicName: Back})`}} className="navigation-bar">
                            <span className="group-owner">Należysz <i className="fa fa-check"></i></span>
                        </nav>
                    }
                    
                    <div className="navigate">
                        <div className="group-nav-left">
                            <i onClick={this.showPostsClickHandler} className="fa fa-clipboard"></i>
                            <i onClick={this.showEventsClickHandler} className="fa fa-calendar"></i>
                        </div>
                        <div className="group-nav-right">
                            <i onClick={this.modalShowClickHandler} className="fa fa-envelope"></i>
                            <i onClick={this.modalShowClickHandler} className="fa fa-user-plus"></i>
                        </div>                               
                    </div>
                    <p className="group-desc-title">Opis grupy</p>
                    <p className="group-desc">{this.state.loadedData.description} </p>
                    {this.state.showEvents ? <Events /> : 
                    <Posts groupName={this.state.loadedData.name} loadingPostsError={this.state.loadingPostsError}
                    posts={this.state.loadedPosts} />}
                     
                </div>
                <Modal
                show={this.state.showSendMessageToOwnerModal} 
                clickedMethod={this.modalShowClickHandler}> 
                    <OpenedMessage />
                </Modal>
            </div>
            
        );
    }
}
const mapStateToProps = state => {
    return {
        loggedObject: state.logRed.loggedObject
    };
}

export default connect(mapStateToProps, null,)(withRouter(Group));



