import React, { Component } from 'react';
import './CommentSection.css';
import 'font-awesome/css/font-awesome.min.css';
import axios from '../../axios-groupsconnects';
import { validateInput } from '../../containers/UserOptions/Validation/Validation';
class CommentSection extends Component{
    state = {
        CommentContent: "",
        commentValidation: "",
        comments: this.props.comments.reverse(),

        sendingCommentError: ""
    }
    onChangeHandler = (event) => {
        const result = validateInput(2,255, 
            event.target.value, ["przeklenstwo"], "", "", "komentarz", "");

        this.setState({CommentContent: event.target.value, commentValidation: result,
        sendingCommentError: ""});
    }
    addComment = () => {
        console.log();
        if(!this.state.commentValidation && this.state.CommentContent){
            const responseObject = JSON.parse(localStorage.getItem('responseObject')) !== null ?
            JSON.parse(localStorage.getItem('responseObject')) : this.props.userObject;

            const newComment = {
                    Content: this.state.CommentContent,
                    PostId: this.props.PostId,
                    AuthorId: responseObject.id
            }
            axios.post('api/commensts/add', newComment).then(response => {
                this.setState({comments: response.data.successResult.post.comments.reverse()});
                
            }).catch(error => {
                this.setState({sendingCommentError: "Wystąpił błąd podczas dodawania komentarza"});
            })
        }
        else{
            const result = validateInput(2,255, 
                this.state.CommentContent, ["przeklenstwo"], "", "", "komentarz", "");
    
            this.setState({commentValidation: result, sendingCommentError: ""});
            
        }
       
        
    }
    render(){
        return(
            <ul className="CommentSection">
                <li className="add-comment-area">
                    <button onClick={this.addComment} className="add-comment-gr-button">
                        Dodaj komentarz <i className="fa fa-plus"></i>
                    </button>
                    <textarea className={this.state.commentValidation 
                    ? "validation-input-error" : null}
                    value={this.state.CommentContent} 
                    onChange={(e) => this.onChangeHandler(e)} placeholder="Dodaj nowy komentarz...">
                    </textarea>


                    <span style={{fontSize: '16px', padding: '10px', height: '40px',
                    opacity: !(this.state.sendingCommentError || this.state.commentValidation) ? '0' : '1'}} 
                    className="backdropo-error">{this.state.sendingCommentError ? this.state.sendingCommentError : 
                    this.state.commentValidation ? this.state.commentValidation : null}</span>         
                    
                  
                </li>
                {this.state.comments.map(item => {
                    return (
                    <li key={item.id}>
                        <span className="CommentInfo">
                            <b>{item.userName === undefined ? item.userName : item.userName }</b>
                            <b>{item.modifiedDate.slice(0,10) + " "
                             + item.modifiedDate.slice(11,16)}</b>
                        </span>
                        <span className="CommentBody">
                            {item.content === undefined ? item.body : item.content}
                        </span>
                    </li>
                    );
                })}
            </ul>
        );
    }
}


export default CommentSection;