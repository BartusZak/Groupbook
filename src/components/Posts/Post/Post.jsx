import React, { Component } from 'react';
import CommentSection from '../../CommentSection/CommentSection';
import Image from '../../../assets/img/profiles/facet.jpg';
import 'font-awesome/css/font-awesome.min.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import ImagePost from '../../../assets/img/404/404.jpg';
import Aux from '../../../hoc/Auxi';
import EmptyAvatarMan from '../../../assets/img/empty_avatars/empty_avatar_man.jpg';
import EmptyAvatarGirl from '../../../assets/img/empty_avatars/empty-avatar-girl.jpg';
// Pamietac, zeby potem tu wrocic i to poprawic - problem z erroramni od komentarzy
class Post extends Component{
    state = {
        showComments: false,
        showPicture: false,
        postId: this.props.postId
    }
    showCommentsClickHandler = () => { 
        const oldState = {
            ...this.state
        }
        this.setState({showComments: !oldState.showComments});
    }

    showPostPicture = () => { this.setState({showPicture: !this.state.showPicture}); }
    
    render(){
        const Content = this.state.showComments ? this.props.commentsErrorLoading ? 
        <h5 className="loading-error-eessage">Wystąpił błąd podczas ładowania komentarzy</h5> : 
        <CommentSection 
        comments={this.props.comments}
        PostId={this.state.postId}/> : null;   
        return(
            <Aux>
                <li>
                    <p className="post-block-add-date">
                    {this.props.addDate.slice(0,10) + " " + this.props.addDate.slice(11,16)}</p>
                    <div className="flex-cont">
                        <div className="post-block-image-holder">
                            <img src={!this.props.authorAvatar ? 
                            this.props.sex ? EmptyAvatarGirl : 
                            EmptyAvatarMan : "https://groupsconnectsapi.azurewebsites.net/pictures/" + 
                            this.props.authorAvatar.avatar
                            } alt="Opis"/>
                        </div>
                        <p className="post-block-author">{this.props.userName}</p>
                    </div>    
                    <div className="post-block-title">
                        <span>{this.props.postTitle}</span> 
                        {this.props.postPicture.length ? 
                        <i onClick={this.showPostPicture} className="fa fa-image"></i> : null}
                        
                            
                    </div>
                    <article>{this.props.description}</article>
                            
                        
                    <p onClick={this.showCommentsClickHandler} 
                    className="add-comment-button">{  this.state.showComments ? "Schowaj komentarze" : "Pokaż komentarze"
                    }</p>
                    {Content}
                    
                </li>        
                
                           
                <Backdrop show={this.state.showPicture} clicked={this.showPostPicture}>
                    <div className="image-container" style={{display: this.state.showPicture ? 'initial' : 'none'}}>
                        <img src={this.props.postPicture.length ? 
                        "https://groupsconnectsapi.azurewebsites.net/pictures/" + this.props.postPicture[0].picture.fullResolutionPicName : null} alt="" />
                    </div>
                </Backdrop>
            </Aux>    
           
        );
    }
}

export default Post;