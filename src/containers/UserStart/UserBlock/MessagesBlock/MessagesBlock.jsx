import React, { Component } from 'react';
import './MessagesBlock.css';
import axios from '../../../../axios-post';
import Spinner from '../../../../components/UI/Spinner/Spinner';

class MessagesBlock extends Component {
    state = {
        date: [],
        isLoading: false,
        error: false
    }
 
    componentDidMount(){
        this.setState({isLoading: true});
        axios.get('/comments')
        .then(response => {
            const responseData = response.data.slice(0, 4);
            this.setState({data: responseData, isLoading: false});
        }).catch(error => {
            this.setState({error: true, isLoading: false});
        });
    }


    render() {
        const ErrorMsg = this.state.error ? <h3>Nie mogliśmy załadować wiadomości</h3> : null;
 


        return(
            <div className="MessagesBlock">
                <b>Twoje wiadomości</b>
                <hr />
                {ErrorMsg}
            </div>
        );
    }
}


export default MessagesBlock;