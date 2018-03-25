import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchingComments } from '../../../containers/UserOptions/Store/actions';
import CommentSection from '../../../components/PostModalContent/CommentSection/CommentSection';
import Image from '../../../assets/img/profiles/facet.jpg';
import 'font-awesome/css/font-awesome.min.css';
class Post extends Component{
    state = {
        showComments: false,
        loadedComments: [],
        postId: this.props.postId
    }
    showCommentsClickHandler = () => { 
        this.setState({showComments: !this.state.showComments, showLoader: true});
        if(this.state.loadedComments.length === 0 ) this.setState({loadedComments: this.props.fetchingComments(this.state.postId), showLoader: false});
    }
    render(){
        const Comments = this.state.showComments ? 
            <CommentSection comments={this.state.loadedComments} /> : null;

        const Result = this.props.commentsErrorLoading ? <h5>Wystąpił błąd </h5> : Comments;
        return(
            <div className="post-two-elements-container">
                <ul className="post-block-container">
                    <li>
                        <p className="post-block-add-date">19 styczeń 2017</p>
                        <div className="flex-cont">
                            <div className="post-block-image-holder">
                                <img src={Image} alt="Opis"/>
                            </div>
                            <p className="post-block-author">Jenkins 1994</p>
                        </div>    
                        <p className="post-block-title">
                                <span>Problem z mlodszym bratem</span> 
                                <i class="fa fa-image"></i>
                        </p>
                        <article>
                            dsad asd asdsadad asdsa asdasdsa dasdsad asdas asdsad dssadsa saadadsadsadsa
                            dasdsadsadsadsa aasdsadsad adsad asdsad ssad ad asdsa ad
                        </article>
                        <p onClick={this.showCommentsClickHandler} className="add-comment-button">{this.state.showComments ? "Schowaj komentarze" : "Pokaż komentarze"}</p>
                        {Result}
                    
                    </li>
                </ul>
                
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        comments: state.userOptionsRed.comments,
        commentsErrorLoading: state.userOptionsRed.commentsErrorLoading
    };
}
const mapDispatchToProps = dispatch => {
    return {
        fetchingComments: (id) => dispatch(fetchingComments(id))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Post);