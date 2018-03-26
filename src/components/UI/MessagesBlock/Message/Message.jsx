import React, { Component } from 'react';
import './Message.css';
import Modal from '../../Modal/Modal';
import OpenedMessage from '../../OpenedMessage/OpenedMessage';
class Message extends Component{
    state = {
        showMessages: false
    }

    showCommentsHandler = () => { this.setState({showMessages: !this.state.showMessages}); }
    render(){
        let contentIsToLength = this.props.content;
        if(this.props.content.length > 60){
            contentIsToLength = "Skorzystaj z komunikatora,aby porozmawiać :)";
        }
    
        return (
            <div className="Message">
                <div className="AuthorAndDate" onClick={this.showCommentsHandler}>
                    <b>{this.props.author}</b>
                    <i>{this.props.date}</i> 
                    
                </div>
               
                <div className="MessageContent"  onClick={this.showCommentsHandler}>{contentIsToLength}</div>
                   
                <Modal width={window.innerWidth > 1100 ? "50%" : "90%"} left={window.innerWidth > 1100 ? "20%" : ""} heightPosition="10%" show={this.state.showMessages} clickedMethod={this.showCommentsHandler}>
                    <OpenedMessage author={this.props.author}/>
                </Modal>
            </div>
        );
    }
}



export default Message;