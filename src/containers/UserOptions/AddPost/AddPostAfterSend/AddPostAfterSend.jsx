import React from 'react';
import './AddPostAfterSend.css';
import Button from '../../../../components/UI/Button';
import Aux from '../../../../hoc/Auxi';
const AddPostAfterSend = (props) => {
    let Content = null;
    if(props.error)
        Content = (
             <Aux>
                <Button title="Prześlij ponownie" clicked={props.SendAgain} />
                <Button color="info" title="Cofnij" clicked={props.backToAdding}/>
                <Button title="Przejdź do poczekalni" clicked={props.goToPostPage} />
             </Aux> );
    else
        Content = (
            <Aux>
                <Button color="info" title="Cofnij" clicked={props.backToAdding}/>
                <Button title="Przejdź do poczekalni"  clicked={props.goToPostPage} />
            </Aux> );
    return (
        <div className="AddPost-flex">
            <h2>{props.title}</h2>
            {Content}
        </div>
    );
}

export default AddPostAfterSend;