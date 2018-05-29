import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { MessagesBlockDiv } from './MessagesBlock.style';
import axios from 'axios/axios-post';
import Spinner from '../Spinner/Spinner';
import Message from './Message/Message';
import Modal from '../Modal/Modal';
import OpenedMessage from '../OpenedMessage/OpenedMessage';

class MessagesBlock extends Component {
    state = {
        data: [],
        isLoading: false,
        error: false,
        start: 0,
        end: 15,
        downSpinnerIsLoading: false,
        scrollStartPoint: 300,
        stopScrollPoint: 0
    }
    componentDidMount(){
        this.takingMessagesFromTheServerAtStart(this.state.start, this.state.end);
    }
    takingMessagesFromTheServerAtStart = (start, end) => {
        this.setState({isLoading: true});
        axios.get('/comments')
        .then(response => {
            const responseData = response.data.slice(this.state.start, this.state.end);
            this.setState({data: responseData, isLoading: false});
           
        }).catch(error => {
            this.setState({error: true, isLoading: false});
        });
    }

    onLoadMoreEventHandler = () => {
        const oldStartPoint = this.state.scrollStartPoint;
        const oldData = this.state.data;
        const oldStart = this.state.start;
        const oldEnd = this.state.end;
        if(this.messagesEnd.scrollTop > oldStartPoint){

             this.setState({downSpinnerIsLoading: true, scrollStartPoint: oldStartPoint+600,start: oldStart+15, end: oldEnd, stopScrollPoint: this.messagesEnd.scrollTop});
             axios.get('/comments')
             .then(response => {
                 let responseData = response.data.slice(oldStart+15, oldEnd+15);
                responseData = oldData.concat(responseData);
                 this.setState({data: responseData, downSpinnerIsLoading: false});
                
             }).catch(error => {
                 this.setState({error: true, downSpinnerIsLoading: false});
             });
           
        }
    }
    render() {
        let Messages =  this.state.isLoading ? <Spinner /> : this.state.data.map(item => {
            return <Message 
            author={item.email}
            content={item.body}
            date="19-12-2015 16:43"
            key={item.id} 
            clicked={this.props.activateChatWindow}
            />
            
        });


        if(this.state.error){
            Messages = <h4 style={{textAlign: 'center'}}>Nie mogliśmy załadować wiadomości</h4>;
        }
      
        return(
            <MessagesBlockDiv>
                <div className="MessagesButtons">
                    <b>Twoje wiadomości</b>
                    <span onClick={this.showHideMessageOnClickHandler}>Nowa wiadomość</span>
                   
                </div>
               
                <div className="Messages" ref={(el) => { this.messagesEnd = el; }} onScroll={this.onLoadMoreEventHandler}>
                    {this.state.downSpinnerIsLoading ? <Spinner /> : Messages}
                </div>
                
            </MessagesBlockDiv>
        );
    }
}


export default MessagesBlock;