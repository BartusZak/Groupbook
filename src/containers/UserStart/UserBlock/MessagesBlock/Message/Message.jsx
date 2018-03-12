import React from 'react';
import './Message.css';
const message = (props) => {
    let contentIsToLength = props.content;
    if(props.content.length > 60){
        contentIsToLength = "Skorzystaj z komunikatora,aby porozmawiać :)";
    }

    return (
        <div className="Message">
            <div className="AuthorAndDate">
                <b>{props.author}</b>
                <i>{props.date}</i> 
                
            </div>
           
            <div className="MessageContent">{contentIsToLength}</div>

        </div>
    );
}

export default message;