import React, { Component } from 'react';
import './Chat.css';
import Aux from '../../hoc/Auxi';
import RodoPrompt from './RodoPrompt/RodoPrompt';
import ChatClient from './ChatClient//ChatClient';
import { fetchUsersActionCreator, fetchNextUsersActionCreator } from '../../store/Users/Actions'; 
import {connect} from 'react-redux';
class Chat extends Component {
    constructor(props){
        super(props);
        this.state = {
            chatOn: null,
            isLoading: false,
            usersPanel: true
        }
    }
    componentDidMount(){
        if(this.props.ruleAccepted){
            this.setState({isLoading: true, chatOn: true});
            this.props.fetchUsers();
        }
        
        else if(!this.props.ruleAccepted)
            this.setState({chatOn: false});
    }
    componentDidUpdate(nextProps){
        if(nextProps.fetchUsersErrors !== this.props.fetchUsersErrors)
            this.setState({isLoading: false});
    }
    confirmRodo = () => { 
        this.setState({chatOn: true, isLoading: true});
        this.props.fetchUsers();
    }
   
    toggleUserPanel = () => { this.setState({usersPanel: !this.state.usersPanel}); }

    loadMoreUsers = () => {
        this.props.fetchNextUsers(this.props.fetchedUsers[this.props.fetchedUsers.length-1].id, [...this.props.fetchedUsers]);
    }
    render() { 
        return ( 
        <div className="chat-container">
            { this.state.chatOn ? 
            <ChatClient 
            reference={el => this.ulScrollItem = el}
            loadMoreUsers={e => this.loadMoreUsers(e)}
            toggleUserPanel={this.toggleUserPanel}
            usersPanel={this.state.usersPanel}
            isLoading={this.state.isLoading}
            exitChat={this.props.exitChat} 
            error={this.props.fetchUsersResult} 
            errorMessage={this.props.fetchUsersErrors[0]}
            fetchedUsers={this.props.fetchedUsers} />

            : <RodoPrompt
            confirmRodo={this.confirmRodo}
            exitChat={this.props.exitChat} /> 
            }
            
        </div> 
        )
    }
}
 
const mapStateToProps = state => {
    return {
        fetchedUsers: state.UsersReducer.fetchedUsers,
        fetchUsersErrors: state.UsersReducer.fetchUsersErrors,
        fetchUsersResult: state.UsersReducer.fetchUsersResult
    };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchUsers: () => dispatch(fetchUsersActionCreator()),
        fetchNextUsers: (lastUserId, actualUsers) => dispatch(fetchNextUsersActionCreator(lastUserId, actualUsers))

    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Chat);
