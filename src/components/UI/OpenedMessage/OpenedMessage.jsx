import React, { Component } from 'react';
import './OpenedMessage.css';
import Button from '../Button';
import Spinner from '../Spinner/Spinner';
import Aux from '../../../hoc/Auxi';
class OpenedMessage extends Component {
    render(){
        return (
        <div className="OpenedMessage">
            <div className="message-holder">
                    <label className="message-input-label">Wyślij do: </label>
                    <input value={this.props.author} className="message-who-textbox" type="text" placeholder="Nazwa użytkownika bądź jego adres email..."/>
                </div>
                <div className="message-holder">
                    <label className="message-input-label">Treść wiadomości: </label>
                    <textarea className="message-textarea" placeholder="Treść wiadomości..."></textarea>
                </div>
            <Button color="elegant" clicked={this.onClickShowSpinnerHandler} title="Wyśli wiadomość"/>
        </div>
        );
    }
} 
export default OpenedMessage;