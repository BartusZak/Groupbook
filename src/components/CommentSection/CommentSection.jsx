import React, { Component } from 'react';
import './CommentSection.css';
import 'font-awesome/css/font-awesome.min.css';
import axios from 'axios/axios-groupsconnects';
import { validateInput } from 'containers/UserOptions/Validation/Validation';
import { connect } from 'react-redux';
import { addCommentsActionCreator, deleteCommentsActionCreator, editCommentsActionCreator } from '../../store/Comments/Actions';

function getIndex(value, arr, prop) {
    for(var i = 0; i < arr.length; i++) {
        if(arr[i][prop] === value) {
            return i;
        }
    }
    return -1; //to handle the case where the value doesn't exist
}

class CommentSection extends Component{
    state = {
        CommentContent: "",
        commentValidation: "",
        sendingCommentError: "",
        comments: this.props.comments,
        response: this.props.response,
        editingCommentId: null
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
        if(prevProps.response !== this.props.response){
            this.setState({response: this.props.response});
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

    deleteCommentHandler = (commentId) => {
        this.props.deleteCommentsActionCreator(commentId);
        let comments = [...this.state.comments];
        let index = getIndex(commentId, comments, 'id');
        comments.splice(index, 1);
        
        
        this.setState({comments: comments});
    }

    editCommentHandler = (commentId) => {
        this.setState({editingCommentId: commentId});
    }

    onCommentInputChangeHandler = (event, id) => {
        let oldList = [...this.state.comments];

        oldList[id].content = event.target.value;
        

        this.setState({comments: oldList});
    }

    onSubmitCommentChange = (commentId, content) => {

        console.log(commentId, content);
        this.props.editCommentsActionCreator(commentId, content);

        this.setState({editingCommentId: null});
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
                    onChange={(e) => this.onChangeHandler(e)} 
                    placeholder="Dodaj nowy komentarz...">
                    </textarea>


                    <span style={{fontSize: '16px', padding: '10px', height: '40px',
                    opacity: !(this.state.sendingCommentError || this.state.commentValidation) ? '0' : '1'}} 
                    className="backdropo-error">{this.state.sendingCommentError ? this.state.sendingCommentError : 
                    this.state.commentValidation ? this.state.commentValidation : null}</span>         
                    
                  
                </li>
    
                {this.state.comments.map((item, id) => {
                    return (
                    <li key={item.id}>
                        <span className="CommentInfo">
                            <b>{item.author.username}</b>
                            <b>{item.modifiedDate.slice(0,10) + " "
                             + item.modifiedDate.slice(11,16)}</b>
                            {(JSON.parse(localStorage.getItem('responseObject')).id === item.author.id)?
                            (
                                <span>
                                    <i onClick={() => this.deleteCommentHandler(item.id)} className="fa fa-trash"></i>
                                    <i onClick={() => this.editCommentHandler(item.id)} className="fa fa-edit"></i>
                                </span>
                            )
                            :
                            null}
                        </span>
                        {(this.state.editingCommentId === item.id)? (
                            <input 
                                onChange={(event) => this.onCommentInputChangeHandler(event, id)} 
                                value={item.content}
                                onKeyPress={event => {
                                    if (event.key === 'Enter') {
                                      this.onSubmitCommentChange(item.id, item.content);
                                    }
                                }}
                                />
                        )
                        :
                        <span className="CommentBody">
                            {item.content === undefined ? item.body : item.content}
                        </span>
                        }
                        
                    </li>
                    );
                })}
            </ul>
        );
    }
}

const mapStateToProps = state => {
    return {
        addedComments: state.CommentsReducer.addedComments,
        response: state.CommentsReducer.response
    }
}
const mapDispatchToProps = dispatch => {
    return {
        addCommentsActionCreator: (content, postId) => dispatch(addCommentsActionCreator(content, postId)),
        deleteCommentsActionCreator: (commentId) => dispatch(deleteCommentsActionCreator(commentId)),
        editCommentsActionCreator: (commentId, content) => dispatch(editCommentsActionCreator(commentId, content)),
        
        
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(CommentSection);


