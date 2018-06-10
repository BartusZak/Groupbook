import React, { Component } from 'react';
import './Chat.css';
import Aux from '../../hoc/Auxi';
import RodoPrompt from './RodoPrompt/RodoPrompt';
import ChatClient from './ChatClient//ChatClient';
import { fetchUsersActionCreator } from '../../store/Users/Actions'; 
import {connect} from 'react-redux';
class Chat extends Component {
    state = {
        chatOn: null,
        isLoading: false
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
   
    render() { 
        console.log(this.props.fetchedUsers);
        return ( 
        <div className="chat-container">
            { this.state.chatOn ? 
            <ChatClient 
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
        fetchUsers: () => dispatch(fetchUsersActionCreator())
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Chat);
