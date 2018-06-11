import React, { Component } from 'react';
import './SingleConnection.css';
import { connect } from 'react-redux';
import * as signalR from '@aspnet/signalr'
import { getConversationsActionCreator } from '../../../../store/Users/Actions';
import { validateInput, IncorrectWords } from '../../../../containers/UserOptions/Validation/Validation';
import { HubConnection } from '@aspnet/signalr';
class SingleConnection extends Component {
    state = {
        currentMessage: "",
        validationStatus: "",


        connectionMessages: [],
        connection: null,
        connectionError: ""

    }
    componentDidMount(){
        this.props.getConversations(this.props.id);

        const connection = new signalR.HubConnectionBuilder().
            withUrl("https://groupsconnectsapi.azurewebsites.net/chat").
            configureLogging(signalR.LogLevel.Information).
            build();

        let connectionError = "";
        connection.start().catch(error => {
            this.setState({connectionError: "Wystąpił błąd podczas komunikacji"});
        });
        
        this.setState({connection: connection});
    }
 
    sendMessage = e => {
        e.preventDefault();
        const validationResult = this.state.currentMessage ? "" : "Wiadomość musi być dłuższa";
        if(validationResult){
            this.setState({validationStatus: validationResult});
        }
        else{
            

      
        }


    }
    onChangeHandler = e => {
        const validationResult = e.target.value.length > 1 ? "" : "Wiadomość musi być dłuższa";
        
        this.setState({currentMessage: e.target.value, 
            validationStatus: validationResult});
    }
    render() { 
        return ( 
        <form onSubmit={e => this.sendMessage(e)} key={this.props.id} className="single-connection">
            <h5>
                <b>{this.props.username}</b>
                <i onClick={this.props.closeSingleWindow} id={this.props.id} className="fa fa-times"></i>
            </h5>
            <article>
                {this.state.connectionError === "" ?
                null : <p>{this.state.connectionError}</p>}
            </article>

            <textarea value={this.state.currentMessage} 
            onChange={e => this.onChangeHandler(e)} placeholder="wpisz wiadomość...">
            </textarea>   

            <div className="btn-and-validation-container">
                {this.state.validationStatus !== "" ? 
                <p className="connection-validation">{this.state.validationStatus}</p> : 
                
                <input type="submit" value="Prześlij" />}
            </div>
            
        </form>
        )
    }
}
 

const mapStateToProps = state => {
    return {
        conversations: state.UsersReducer.conversations,
        conversationsErrors: state.UsersReducer.conversationsErrors,
        conversationResults: state.UsersReducer.conversationResults
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getConversations: (receiverId) => dispatch(getConversationsActionCreator(receiverId))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(SingleConnection);
