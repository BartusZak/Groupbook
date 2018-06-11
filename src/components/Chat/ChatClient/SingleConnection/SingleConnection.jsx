import React, { Component } from 'react';
import './SingleConnection.css';
import { connect } from 'react-redux';
import * as signalR from '@aspnet/signalr';
import { getConversationsActionCreator } from '../../../../store/Users/Actions';
import { validateInput, IncorrectWords } from '../../../../containers/UserOptions/Validation/Validation';

class SingleConnection extends Component {
    state = {
        currentMessage: null,
        validationStatus: ""
    }
    componentDidMount(){
        this.props.getConversations(this.props.id);

        const config = {
            headers: {'Authorization': "bearer " + JSON.parse(localStorage.getItem('responseObject')).token}
        };

        const transport = signalR.HttpTransportType;
        let connection = new signalR.HubConnectionBuilder()
        .withUrl("https://groupsconnectsapi.azurewebsites.net/chat").build();

        connection.on("MessageAdded", data => {
            console.log(data);
        });
      

        connection.start().then( () => {
            connection.invoke("addMessage", "siema", this.props.id)
        });
    }
 
    sendMessage = e => {
        e.preventDefault();
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
