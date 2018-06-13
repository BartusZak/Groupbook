import React, { Component } from 'react';
import './SingleConnection.css';
import * as signalR from '@aspnet/signalr'
import { validateInput, IncorrectWords } from '../../../../containers/UserOptions/Validation/Validation';
import { HubConnection } from '@aspnet/signalr';
import Spinner from '../../../UI/OwnSpinner/OwnSpinner';
import axios from '../../../../axios/axios-groupsconnects';
import { handleErrors } from '../../../../store/errorHandler';
import { apiPicturesUrl } from '../../../../axios/apiPicturesUrl';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import Alert from 'react-s-alert';
import Sound from '../../../../assets/sounds/unconvinced.mp3';
import AlertComponent from '../../../UI/AlertComponent/AlertComponent';

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
        axios.get("/api/chat/conversation/" + this.props.user.id, config).then(response => {
            const connection = new signalR.HubConnectionBuilder().
            withUrl("https://groupsconnectsapi.azurewebsites.net/chat?" + "token=" + 
            JSON.parse(localStorage.getItem('responseObject')).token, 
            {transport: signalR.HttpTransportType.LongPolling}).
            build();

            connection.start().catch(error => {
                this.setState({connectionError: "Błąd przy nawiązaniu połączenia"});
            })

            connection.on('receiveMessage', (content, date, id, senderId, receiverId) => {
                if(receiverId === this.props.user.id){
                    Alert.info('Test message 2', {
                        position: 'top',
                        effect: 'bouncyflip',
                        beep: Sound,
                        timeout: 'none'
                    });
                    const newMessage = {content: content, creationDate: date, 
                        id: id, senderId: senderId, receiverId: receiverId};
                    const conversation = [...this.state.conversation];
                    conversation.push(newMessage);
                    this.setState({ conversation: conversation });
                }
               
            });
            connection.on('messageSent', (content, date, id, senderId, receiverId) => {
                if(this.props.user.id === senderId){
                    Alert.closeAll();
                    const newMessage = {content: content, creationDate: date, 
                        id: id, senderId: senderId, receiverId: receiverId};
                    const conversation = [...this.state.conversation];
                    conversation.push(newMessage);
                    this.setState({ conversation: conversation });
                }
                
            });
            this.setState({connection: connection, conversation: response.data, loadingMessages: false});
            this.scrollToBottom();
            
        }).catch(error => {
            this.setState({loadingMessages: false, connectionError: handleErrors(error)});
        })
    }
    componentDidUpdate(){
        this.scrollToBottom();
    }
    scrollToBottom = () => {
        this.formRef.scrollTop = this.formRef.scrollHeight;
    }
      
    sendMessage = e => {
        e.preventDefault();
        const validationResult = this.state.currentMessage ? "" : "Wiadomość musi być dłuższa";
        if(validationResult){
            this.setState({validationStatus: validationResult});
        }
        else{
            this.state.connection.invoke("addMessage", 
                this.state.currentMessage, this.props.user.id);

            this.setState({currentMessage: ""});
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


            <article ref={el => { this.formRef = el; }}>
                {!this.state.loadingMessages ? 
                    this.state.connectionError === "" ?
                    this.state.conversation.length > 0 ? 
                    this.state.conversation.map(i => {
                        return (
                            <p key={i.id} className={i.senderId !== JSON.parse(localStorage.getItem('responseObject')).id ? 
                            "conv-message-sender" : "conv-message-receiver"}>
                                {i.content}
                                <b>{i.creationDate.slice(0, 10) + " " + i.creationDate.slice(11,16)}</b>
                            </p>
                        );
                    })
                    : 
                    <p className="nt-started-conversation">Tej konwersacji nie rozpoczęto :(</p>
                
                : <p className="connection-error">{this.state.connectionError}</p> : null}
            </article>

            {this.state.loadingMessages ? null : 

                
                <input type="text" className="loading-content" value={this.state.currentMessage} 
                onChange={e => this.onChangeHandler(e)} placeholder="wpisz wiadomość..."/>
            }

              
            
            {this.state.loadingMessages ? 
            <Spinner /> : null}
            
            {this.state.loadingMessages ? null :
            <div className="btn-and-validation-container">
                {this.state.validationStatus !== "" ? 
                <p className="connection-validation">{this.state.validationStatus}</p> : 
                
                <input type="submit" value="Prześlij" />}
            </div>}
            
            <Alert contentTemplate={AlertComponent}
            stack={{limit: 1}}  />
        </form>
        )
    }
}
 

export default SingleConnection;
