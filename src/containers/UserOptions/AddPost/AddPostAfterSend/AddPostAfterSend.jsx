import React from 'react';
import './AddPostAfterSend.css';
import Button from '../../../../components/UI/Button';
import Aux from '../../../../hoc/Auxi';
const AddPostAfterSend = (props) => {
    let Content = null;
    if(props.error)
        Content = (
             <Aux>
                <Button title="Prześlij ponownie" overRideClass="Carrot-button Pomangerate" clicked={props.SendAgain} />
                <Button title="Cofnij" overRideClass="Carrot-button" clicked={props.backToAdding}/>
                <Button title="Przejdź do poczekalni" overRideClass="Carrot-button Oranged" clicked={props.goToPostPage} />
             </Aux> );
    else
        Content = (
            <Aux>
                <Button title="Cofnij" overRideClass="Carrot-button" clicked={props.backToAdding}/>
                <Button title="Przejdź do poczekalni" overRideClass="Carrot-button Oranged" clicked={props.goToPostPage} />
            </Aux> );
    return (
        <div className="AddPost-flex">
            <h2>{props.title}</h2>
            {Content}
        </div>
    );
}

export default AddPostAfterSend;