import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchingComments } from '../../../containers/UserOptions/Store/actions';
import CommentSection from '../../CommentSection/CommentSection';
import Image from '../../../assets/img/profiles/facet.jpg';
import 'font-awesome/css/font-awesome.min.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import ImagePost from '../../../assets/img/404/404.jpg';
import Aux from '../../../hoc/Auxi';
// Pamietac, zeby potem tu wrocic i to poprawic - problem z erroramni od komentarzy
class Post extends Component{
    state = {
        showComments: false,
        loadedComments: [],
        showPicture: false,
        postId: this.props.postId
    }
   
    showCommentsClickHandler = () => { 
        const oldState = {
            ...this.state
        }
        if(oldState.loadedComments.length === 0 ) {
            oldState.loadedComments = this.props.fetchingComments(oldState.postId);
            this.setState({loadedComments: oldState.loadedComments});
        }  
        this.setState({showComments: !oldState.showComments});
    }

    showPostPicture = () => { this.setState({showPicture: !this.state.showPicture}); }

    render(){
        const Content = this.state.showComments ? this.props.commentsErrorLoading ? 
        <h5 className="loading-error-eessage">Wystąpił błąd podczas ładowania komentarzy</h5> : 
        <CommentSection comments={this.state.loadedComments} /> : null;   
        return(
            <Aux>
                <li>
                    <p className="post-block-add-date">{this.props.addDate}</p>
                    <div className="flex-cont">
                        <div className="post-block-image-holder">
                            <img src={Image} alt="Opis"/>
                        </div>
                        <p className="post-block-author">{this.props.userName}</p>
                    </div>    
                    <div className="post-block-title">
                        <span>{this.props.postTitle}</span> 
                        <i onClick={this.showPostPicture} className="fa fa-image"></i>
                            
                    </div>
                    <article>{this.props.description}</article>
                            
                        
                    <p onClick={this.showCommentsClickHandler} 
                    className="add-comment-button">{  this.state.showComments ? "Schowaj komentarze" : "Pokaż komentarze"
                    }</p>
                    {Content}
                    
                </li>        
                
                           
                <Backdrop show={this.state.showPicture} clicked={this.showPostPicture}>
                    <div className="image-container" style={{display: this.state.showPicture ? 'initial' : 'none'}}>
                        <img src={ImagePost} alt="" />
                    </div>
                </Backdrop>
            </Aux>    
           
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