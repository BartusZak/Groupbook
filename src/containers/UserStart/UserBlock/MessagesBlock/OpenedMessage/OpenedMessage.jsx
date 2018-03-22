import React, { Component } from 'react';
import './OpenedMessage.css';
import Button from '../../../../../components/UI/Button';
import Spinner from '../../../../../components/UI/Spinner/Spinner';
import Aux from '../../../../../hoc/Auxi';
class OpenedMessage extends Component {
    state = {
        showSpinner: false
    }
  
    onClickShowSpinnerHandler = () => { this.setState({showSpinner: !this.state.showSpinner});}

    render(){
        
        let Content = null;
        if(this.state.showSpinner)
            Content = <Spinner />
        
        else{
            Content = (
                <Aux>
                    <div className="message-holder">
                        <label className="message-input-label">Wyślij do: </label>
                        <input value={this.props.author} className="message-who-textbox" type="text" placeholder="Nazwa użytkownika bądź jego adres email..."/>
                    </div>
                    <div className="message-holder">
                        <label className="message-input-label">Treść wiadomości: </label>
                        <textarea className="message-textarea" placeholder="Treść wiadomości..."></textarea>
                    </div>
                    <Button color="elegant" clicked={this.onClickShowSpinnerHandler} title="Wyśli wiadomość"/>
                </Aux>
            );
        }
        return (
        <div className="OpenedMessage">
            {Content}
        </div>
        );
    }
} 
export default OpenedMessage;