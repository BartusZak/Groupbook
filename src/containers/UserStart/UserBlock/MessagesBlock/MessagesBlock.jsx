import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './MessagesBlock.css';
import axios from '../../../../axios-post';
import Spinner from '../../../../components/UI/Spinner/Spinner';
import Message from './Message/Message';
class MessagesBlock extends Component {
    state = {
        data: [],
        isLoading: false,
        error: false,
        start: 0,
        end: 15,
        downSpinnerIsLoading: false,
        scrollStartPoint: 300
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
        //console.log(this.messagesEnd.scrollTop);
    
        const oldStartPoint = this.state.scrollStartPoint;
        const oldData = this.state.data;
        const oldStart = this.state.start;
        const oldEnd = this.state.end;
       
        if(this.messagesEnd.scrollTop > oldStartPoint){

             this.setState({downSpinnerIsLoading: true, scrollStartPoint: oldStartPoint+600,start: oldStart+15, end: oldEnd});
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
            key={item.id}/>;
        });


        if(this.state.error){
            Messages = <h4 style={{textAlign: 'center'}}>Nie mogliśmy załadować wiadomości</h4>;
        }
      
        return(
            <div className="MessagesBlock" onScroll={this.onLoadMoreEventHandler}>
                <div className="MessagesButtons">
                    <b style={{fontSize: '16px'}}>Twoje wiadomości</b>
                    <span>Nowa wiadomość</span>
                   
                </div>
               
                <div className="Messages" ref={(el) => { this.messagesEnd = el; }}>
                    {this.state.downSpinnerIsLoading ? <Spinner /> : Messages}
                </div>
                
               
            </div>
        );
    }
}


export default MessagesBlock;