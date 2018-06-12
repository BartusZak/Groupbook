import React, { Component } from 'react';
import './SingleConnection.css';
import * as signalR from '@aspnet/signalr'
import { validateInput, IncorrectWords } from '../../../../containers/UserOptions/Validation/Validation';
import { HubConnection } from '@aspnet/signalr';
import Spinner from '../../../UI/OwnSpinner/OwnSpinner';
import axios from '../../../../axios/axios-groupsconnects';
import { handleErrors } from '../../../../store/errorHandler';
class SingleConnection extends Component {
    state = {
        currentMessage: "",
        validationStatus: "",

        conversation: [],
        connection: null,
        


        connectionError: "",
        loadingMessages: true,


    }
    componentDidMount(){
        const config = {
            headers: {'Authorization': "bearer " + JSON.parse(localStorage.getItem('responseObject')).token}
        };
        axios.get("/api/chat/conversation/" + this.props.id, config).then(response => {
            this.setState({conversation: response.data, loadingMessages: false});
        }).catch(error => {
            this.setState({loadingMessages: false, connectionError: handleErrors(error)});
        })



        /*
        const connection = new signalR.HubConnectionBuilder().
            withUrl("https://groupsconnectsapi.azurewebsites.net/chat").
            configureLogging(signalR.LogLevel.Information).
            build();

        let connectionError = "";
        connection.start().catch(error => {
            this.setState({connectionError: "Wystąpił błąd podczas komunikacji", loadingMessages: false});
        });
       
        this.setState({connection: connection});
        */
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
                    this.state.conversation.length > 0 ? 
                    this.state.conversation.map(i => {
                        return (
                            <p key={i.id} className="conv-message"></p>
                        );
                    })
                    : <p className="nt-started-conversation">Tej konwersacji nie rozpoczęto :(</p>
                
                : <p className="connection-error">{this.state.connectionError}</p>}
            </article>

            {this.state.loadingMessages ? null : 
                <textarea className="loading-content" value={this.state.currentMessage} 
                onChange={e => this.onChangeHandler(e)} placeholder="wpisz wiadomość...">
                </textarea>
            }

              
            
            {this.state.loadingMessages ? 
            <Spinner /> : null}
            
            <div className="btn-and-validation-container">
                {this.state.validationStatus !== "" ? 
                <p className="connection-validation">{this.state.validationStatus}</p> : 
                
                <input type="submit" value="Prześlij" />}
            </div>
            
        </form>
        )
    }
}
 

export default SingleConnection;
