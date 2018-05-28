import React, { Component } from 'react';
import './CommentSection.css';
import 'font-awesome/css/font-awesome.min.css';
import axios from 'axios/axios-groupsconnects';
import { validateInput } from 'containers/UserOptions/Validation/Validation';
import { connect } from 'react-redux';
import { addCommentsActionCreator, deleteCommentsActionCreator, editCommentsActionCreator } from '../../store/Comments/Actions';
import { apiPicturesUrl } from '../../axios/apiPicturesUrl';
import Aux from '../../hoc/Auxi';
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
        editingCommentId: null,
        showUsersToTag: false,
        taggedUsers: [],
        loadedUsers: [...this.props.users],
        tagsCounter: 0
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
        this.props.editCommentsActionCreator(commentId, content);

        this.setState({editingCommentId: null});
    }
    showUsersToTag = () => {
        this.setState({showUsersToTag: true});
    }
    tagUser = id => {
        const newLoadedUsers = [...this.state.loadedUsers];
        const newTagedUsers = [...this.state.taggedUsers];
        let newCommentContent = new String(this.state.CommentContent);
        const index = newLoadedUsers.findIndex(i => {
            return i.user.id === id
        });
        newTagedUsers.push(newLoadedUsers[index]);
        newLoadedUsers.splice(index, 1);

        newCommentContent += "@[";
        newCommentContent += newTagedUsers[newTagedUsers.length - 1].user.username + "]";
        
        this.setState({loadedUsers: newLoadedUsers, taggedUsers: newTagedUsers,
            CommentContent: newCommentContent, tagsCounter: this.state.tagsCounter++});
    }
   
    createTagElements = content => {
        const returnArray = [];
        let tagString = "";
        let commentContentString = "";
        console.log(content);
        for(let i = 0; i < content.length; i++){
            if(content.charAt(i) === "@"){
                for(let j = i; j < content.length; j++){
                    if(content.charAt(j) === "]"){
                        returnArray.push({isTag: true , content: tagString});
                        tagString = "";
                        break;
                    }
                    else if(content.charAt(j) !== "[" && content.charAt(j) !== "@")
                        tagString += content.charAt(j);
                }
            }
            else{
                commentContentString += content.charAt(i);
                
            }
           
                
        }
        if(commentContentString.length > 0)
            returnArray.push({isTag: false , content: commentContentString});

    
        console.log(returnArray);
        return returnArray;
        /*

        console.log(content);
        const returnArray = [];
        let helpString = "";
        let contentHelpString = "";
        let indexer = 0;
        for(let i = indexer; i < content.length; i++){
            console.log(indexer);
            if(content.charAt(i) === "@"){
                returnArray.push({isTag: false , content: contentHelpString});
                contentHelpString = "";
                for(let j = i; j < content.length; j++){    
                    console.log(j);
                    if(content.charAt(j) === "]"){
                        indexer = j+1;
                        break;
                    }
                    if(content.charAt(j) !== "@" && content.charAt(j) !== "[")
                        helpString += content.charAt(j);
                }
                returnArray.push({isTag: true , content: helpString});
                helpString = "";
            }
            else if(content.charAt(i) !== "@" && content.charAt(i) !== "[" && 
                content.charAt(i) !== "]")
                contentHelpString += content.charAt(i);
            
        }
        returnArray.push({isTag: false , content: contentHelpString});
        console.log(returnArray);
        return returnArray;
        */
    }
    render(){
        return(
            <ul className="CommentSection">
                <li className="add-comment-area">
                    
                    <textarea className={this.state.commentValidation 
                    ? "validation-input-error" : null}
                    value={this.state.CommentContent} 
                    onChange={(e) => this.onChangeHandler(e)} 
                    placeholder="Dodaj nowy komentarz...">
                    </textarea>
                    <button onClick={this.addComment} className="add-comment-gr-button">
                        Dodaj komentarz <i className="fa fa-plus"></i>
                    </button>
                    
                    {this.state.showUsersToTag ? 
                    <div className="users-to-tag-container">
                        <i onClick={() => this.setState({showUsersToTag: false})} className="fa fa-times"></i>
                        <ul>
                            {this.state.loadedUsers.map(i => {
                                return (<li key={i.user.id} className="user-to-tag">
                                <img onError={e=>{e.target.src=require('assets/img/404/error-image-generic.png')}} 
                                src={i.user.profilePicture ? apiPicturesUrl +
                                i.user.profilePicture : !i.user.sex ? require('assets/img/empty_avatars/empty_avatar_man.jpg') : 
                                require('assets/img/empty_avatars/empty-avatar-girl.jpg')} alt={i.user.username} />
                                
                                <b>{i.user.username}</b>
                                <i onClick={() => this.tagUser(i.user.id)} className="fa fa-check"></i>
                                </li>);   
                            })}
                        </ul>
                        
                    </div> : null}
                    
                    
                    <span style={{fontSize: '16px', padding: '10px', height: '40px',
                    opacity: !(this.state.sendingCommentError || this.state.commentValidation) ? '0' : '1'}} 
                    className="backdropo-error">{this.state.sendingCommentError ? this.state.sendingCommentError : 
                    this.state.commentValidation ? this.state.commentValidation : null}</span>         
                    
                    <button onClick={this.showUsersToTag} className="tag-user-button">Oznacz użytkowników</button>
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
                            <textarea 
                                className="edit-comment-input"
                                onChange={(event) => this.onCommentInputChangeHandler(event, id)} 
                                value={item.content}
                                onKeyPress={event => {
                                    if (event.key === 'Enter') {
                                      this.onSubmitCommentChange(item.id, item.content);
                                    }
                                }}>
                            </textarea>
                        )
                        :
                        <span className="CommentBody">
                            {this.createTagElements(item.content).map((i, index) => {
                                return (
                                    <Aux key={index}>
                                        {i.isTag ? <b className="tagged-user">{i.content}</b> : i.content}
                                    </Aux>
                                );
                            })}
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


