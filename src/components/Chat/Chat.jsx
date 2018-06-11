import React, { Component } from 'react';
import './Chat.css';
import Aux from '../../hoc/Auxi';
import RodoPrompt from './RodoPrompt/RodoPrompt';
import ChatClient from './ChatClient//ChatClient';
import { fetchUsersActionCreator, fetchNextUsersActionCreator } from '../../store/Users/Actions'; 
import {connect} from 'react-redux';
class Chat extends Component {
    state = {
        fetchedUsers: [],
        chatOn: null,
        isLoading: false,
        usersPanel: true,
        isLoadingMoreUsers: false,
        openedConnections: []
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
        if(nextProps.fetchUsersErrors !== this.props.fetchUsersErrors){
            this.setState({isLoading: false, isLoadingMoreUsers: false, 
                fetchedUsers: this.props.fetchedUsers});
        }
    }
    confirmRodo = () => { 
        this.setState({chatOn: true, isLoading: true});
        this.props.fetchUsers();
    }
   
    toggleUserPanel = () => { this.setState({usersPanel: !this.state.usersPanel}); }

    loadMoreUsers = () => {
        if(this.ulScrollItem.scrollTop + 
            this.ulScrollItem.clientHeight >= this.ulScrollItem.scrollHeight){
            this.setState({isLoadingMoreUsers: true});
            this.props.fetchNextUsers([...this.state.fetchedUsers], 
                this.props.lastUserId);
        }
    }


    startConnection = e => {
        const index = this.state.fetchedUsers.findIndex(i => {
            return i.id == e.target.id
        });
        const newOpenedConnections = [...this.state.openedConnections];
        newOpenedConnections.push(this.state.fetchedUsers[index]);

        const newUsers = [...this.state.fetchedUsers];

        newUsers.splice(index, 1);

        this.setState({openedConnections: newOpenedConnections, fetchedUsers: newUsers});
    }

    closeSingleWindow = e => {
        const index = this.state.openedConnections.findIndex(i => {
            return e.target.id == i.id
        });
        const newUsers = [...this.state.fetchedUsers];
        newUsers.push(this.state.openedConnections[index]);
        const newOpennedConnections = [...this.state.openedConnections];
        newOpennedConnections.splice(index, 1);
        this.setState({openedConnections: newOpennedConnections, fetchedUsers: newUsers});
    }
    render() { 
        return ( 
        <div className="chat-container">
            { this.state.chatOn ? 
            <ChatClient 
            openedConnections={this.state.openedConnections}
            closeSingleWindow={e => this.closeSingleWindow(e)}
            startConnection={e => this.startConnection(e)}
            isLoadingMoreUsers={this.state.isLoadingMoreUsers}
            reference={el => this.ulScrollItem = el}
            loadMoreUsers={e => this.loadMoreUsers(e)}
            toggleUserPanel={this.toggleUserPanel}
            usersPanel={this.state.usersPanel}
            isLoading={this.state.isLoading}
            exitChat={this.props.exitChat} 
            error={this.props.fetchUsersResult} 
            errorMessage={this.props.fetchUsersErrors[0]}
            fetchedUsers={this.state.fetchedUsers} />

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
        fetchUsersResult: state.UsersReducer.fetchUsersResult,
        lastUserId: state.UsersReducer.lastUserId

    };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchUsers: () => dispatch(fetchUsersActionCreator()),
        fetchNextUsers: (actualUsers, lastUserId) => dispatch(fetchNextUsersActionCreator(actualUsers, lastUserId))

    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Chat);
