import React from 'react';
import './Message.css';
import Modal from '../../Modal/Modal';
import OpenedMessage from '../../OpenedMessage/OpenedMessage';
const message = props => {
    let contentIsToLength = props.content;
        if(props.content.length > 60){
            contentIsToLength = "Skorzystaj z komunikatora,aby porozmawiać :)";
        }
    return (
    <div className="Message">
        <div className="AuthorAndDate" onClick={props.clicked}>
            <b>{props.author}</b>
            <i>{props.date}</i> 
                    
        </div>
               
        <div className="MessageContent" onClick={props.clicked}>{contentIsToLength}</div>
    </div>
    );
}
    

export default message;