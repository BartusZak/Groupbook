import React, { Component } from 'react';
import './CommentSection.css';
import 'font-awesome/css/font-awesome.min.css';
import axios from 'axios/axios-groupsconnects';
import { validateInput } from '../../containers/UserOptions/Validation/Validation';
import { connect } from 'react-redux';
import { addCommentsActionCreator } from '../../store/Comments/Actions';

class CommentSection extends Component{
    state = {
        CommentContent: "",
        commentValidation: "",
        sendingCommentError: "",
        comments: this.props.comments
    }
    onChangeHandler = event => {
        const result = validateInput(2,255, 
            event.target.value, ["przeklenstwo"], "", "", "komentarz", "");

        this.setState({CommentContent: event.target.value, commentValidation: result,
        sendingCommentError: ""});
    }

    componentDidUpdate(prevProps){
        if(prevProps.addedComments !== this.props.addedComments){
            this.setState({comments: this.props.addedComments});
        }
       
    }

    addComment = () => {
        if(!this.state.commentValidation && this.state.CommentContent){
            this.props.addCommentsActionCreator(this.state.CommentContent, this.props.PostId);
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
                            <b>{item.author.username}</b>
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

const mapStateToProps = state => {
    return {
        addedComments: state.CommentsReducer.addedComments
    }
}
const mapDispatchToProps = dispatch => {
    return {
        addCommentsActionCreator: (content, postId) => dispatch(addCommentsActionCreator(content, postId))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(CommentSection);


