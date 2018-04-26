import React, {Component} from 'react';
import {apiPicturesUrl} from 'axios/apiPicturesUrl';
import {Post} from './SinglePostDetails.style';
import { Col, Row,  } from 'mdbreact';
import { validateInput } from 'containers/UserOptions/Validation/Validation';
import { connect } from 'react-redux';
import { addCommentsActionCreator } from 'store/Comments/Actions';

class singlePostDetails extends Component{
        state = {
            CommentContent: "",
            commentValidation: "",
            sendingCommentError: "",
            comments: this.props.comments,
            addedComments: this.props.addedComments
        }

    onChangeHandler = event => {
        const result = validateInput(2,255, 
            event.target.value, ["przeklenstwo"], "", "", "komentarz", "");

        this.setState({CommentContent: event.target.value, commentValidation: result,sendingCommentError: ""});
    }

    onEnterPress = (e) => {
        if(e.keyCode === 13 && e.shiftKey === false) {
          e.preventDefault();
            if(!this.state.commentValidation && this.state.CommentContent){
                this.props.addCommentsActionCreator(this.state.CommentContent, this.props.postId);
                //zjebany redux nie odswieza mi propow!
                //TODO
            }
            else{
                const result = validateInput(2,255, 
                    this.state.CommentContent, ["przeklenstwo"], "", "", "komentarz", "");
        
                this.setState({commentValidation: result, sendingCommentError: ""});
                
            }
        }
      }

    render(){
        return(
            <Post>
                <Row>
                    <Col>
                        <p className="post-title-name">{this.props.post.title}</p>
                        <hr/>
                        <p className="creation-date">{this.props.post.creationDate.slice(0,10) + " " + this.props.post.creationDate.slice(11,16)}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p>{this.props.post.content}</p>
                        
                        <div className="post-image-container">
                            {(this.props.post.pictures.length > 0 ?
                                <img 
                                    style={{objectFit: "cover"}}
                                    src={apiPicturesUrl+this.props.post.pictures[0].mediumResolutionPicName} 
                                    onError={(e)=>{e.target.src=require('assets/img/404/error-image-generic.png')}} 
                                    alt="alt" />
                            :
                                null
                            )}
                        </div>
                    </Col>
                    <Col className="comments">
                        {(this.props.post.comments !== null)?
                            this.props.post.comments.map( (i) => {
                                return (
                                        <div className="post-single-comment">
                                            <span>{i.content}</span>
                                            <div className="comment-username-date">
                                                <span className="comment-username">{i.author.username}</span>
                                                <span className="creation-date">{i.creationDate.slice(0,10) + " " + i.creationDate.slice(11,16)}</span>
                                            </div>
                                        </div>
                                )  
                        })
                        :
                        <p>Brak komentarzy!</p>
                        }

                        <div className="add-comment">
                            <form ref={el => this.myFormRef = el} className="">
                                <textarea 
                                    className={this.state.commentValidation 
                                    ? "validation-input-error" : null}
                                    value={this.state.CommentContent} 
                                    onChange={(e) => this.onChangeHandler(e)}
                                    onKeyDown={this.onEnterPress}
                                    placeholder="Dodaj nowy komentarz...">
                                </textarea>

                                <span style={{fontSize: '16px', padding: '10px', height: '40px',
                                    opacity: !(this.state.sendingCommentError || this.state.commentValidation) ? '0' : '1'}} 
                                    className="backdropo-error">{this.state.sendingCommentError ? this.state.sendingCommentError : 
                                    this.state.commentValidation ? this.state.commentValidation : null}
                                </span>  

                            </form>
                        </div>
                    </Col>
                </Row>
            </Post>
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
export default connect(mapStateToProps, mapDispatchToProps)(singlePostDetails);

