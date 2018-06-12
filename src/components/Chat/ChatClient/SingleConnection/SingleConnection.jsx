import React, { Component } from 'react';
import './SingleConnection.css';
import * as signalR from '@aspnet/signalr'
import { validateInput, IncorrectWords } from '../../../../containers/UserOptions/Validation/Validation';
import { HubConnection } from '@aspnet/signalr';
import Spinner from '../../../UI/OwnSpinner/OwnSpinner';
import axios from '../../../../axios/axios-groupsconnects';
import { handleErrors } from '../../../../store/errorHandler';
import { apiPicturesUrl } from '../../../../axios/apiPicturesUrl';
class SingleConnection extends Component {
    state = {
        currentMessage: "",
        validationStatus: "",
        conversation: [],
        connection: null,
        transport: null,
        connectionError: "",
        loadingMessages: true,
    }
    componentDidMount(){
        const config = {
            headers: {'Authorization': "bearer " + JSON.parse(localStorage.getItem('responseObject')).token}
        };
        axios.get("/api/chat/conversation/" + this.props.user.id, config).then(response => {
            const transport = signalR.HttpTransportType;
            const connection = new signalR.HubConnectionBuilder().
            withUrl("https://groupsconnectsapi.azurewebsites.net/chat?" + "token=" + 
            JSON.parse(localStorage.getItem('responseObject')).token).
            build();

            
            this.setState({connection: connection, transport: transport, 
                conversation: response.data, loadingMessages: false});
            
        }).catch(error => {
            this.setState({loadingMessages: false, connectionError: handleErrors(error)});
        })
        
        
       
       

    }
  
    sendMessage = e => {
        e.preventDefault();
        const validationResult = this.state.currentMessage ? "" : "Wiadomość musi być dłuższa";
        if(validationResult){
            this.setState({validationStatus: validationResult});
        }
        else{
            this.state.connection.start({transport: this.state.transport}).then(
                () => { 
                    this.state.connection.invoke("addMessage", this.state.currentMessage, this.props.user.id);
                }
            ).catch(error => {
                this.setState({connectionError: "Błąd przy nawiązaniu połączenia"});
            });
        }


    }
    onChangeHandler = e => {
        const validationResult = e.target.value.length > 1 ? "" : "Wiadomość musi być dłuższa";
        
        this.setState({currentMessage: e.target.value, 
            validationStatus: validationResult});
    }
    render() { 
        return ( 
        <form onSubmit={e => this.sendMessage(e)} key={this.props.user.id} className="single-connection">
            <h5>
                <img src={
                (!this.props.user.profilePicture) ? 
                this.props.user.sex ? 
                require('assets/img/empty_avatars/empty-avatar-girl.jpg') : 
                require('assets/img/empty_avatars/empty_avatar_man.jpg') : 
                apiPicturesUrl + this.props.user.profilePicture.avatar} />
                    
                <b>{this.props.user.username}</b>
                <i onClick={this.props.closeSingleWindow} id={this.props.user.id} className="fa fa-times"></i>
            </h5>


            <article>
                {!this.state.loadingMessages ? 
                    this.state.connectionError === "" ?
                    this.state.conversation.length > 0 ? 
                    this.state.conversation.map(i => {
                        return (
                            <p key={i.id} className={i.senderId !== JSON.parse(localStorage.getItem('responseObject')).id ? 
                            "conv-message-sender" : "conv-message-receiver"}>
                                {i.content}
                            </p>
                        );
                    })
                    : 
                    <p className="nt-started-conversation">Tej konwersacji nie rozpoczęto :(</p>
                
                : <p className="connection-error">{this.state.connectionError}</p> : null}
            </article>

            {this.state.loadingMessages ? null : 

                
                <textarea className="loading-content" value={this.state.currentMessage} 
                onChange={e => this.onChangeHandler(e)} placeholder="wpisz wiadomość...">
                </textarea>
            }

              
            
            {this.state.loadingMessages ? 
            <Spinner /> : null}
            
            {this.state.loadingMessages ? null :
            <div className="btn-and-validation-container">
                {this.state.validationStatus !== "" ? 
                <p className="connection-validation">{this.state.validationStatus}</p> : 
                
                <input type="submit" value="Prześlij" />}
            </div>}
            
            
        </form>
        )
    }
}
 

export default SingleConnection;
