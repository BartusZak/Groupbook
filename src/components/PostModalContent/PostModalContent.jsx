import React, { Component } from 'react';
import Meme from '../../assets/img/memeExample/meme.png';
<<<<<<< HEAD
import Spinner from '../UI/Spinner/Spinner';
import './PostModalContent.css';
import Aux from '../../hoc/Auxi';
import { connect } from 'react-redux';
import CommentSection from './CommentSection/CommentSection';
import { fetchingComments } from '../../containers/UserOptions/Store/actions';
class PostModalContent extends Component {
    state = {
        showComments: false,
        comments: this.props.comments
    }
    showComments = () => {
        this.setState({showComments: !this.state.showComments, comments: this.props.initializeComments(1, this.props.comments)});
       
=======

import { ImgDiv } from './PostModalContent.style';
const postModalContent = (props) => {
    return(
        <article className="ModalPost">
            <div className="InformationsAboutPost">
                <h4>{props.name}</h4>
                <span style={{color: 'red'}}>{props.author}</span>
                <span style={{color: 'orange'}}>{props.addDate}</span>
            </div>
            <div className="ModalPostContent">
                <span>
                    <h5>Nazwa grupy </h5>
                    {props.content}
                </span>
                <ImgDiv>
                    <img src={Meme} alt="Meme"></img>
                </ImgDiv>
                
            </div>
         
        </article>
>>>>>>> a5f63bfa1509e22f32526d2d5f0887d650dd11a7

    }
    render(){
        let Comments = null;
        if(this.state.showComments){
            if(this.props.commentsErrorLoading)
                Comments = <p>Wystąpił błąd podczas ładowania komentarzy</p>;
            else
                Comments = this.props.commentsSpinner ? <Spinner /> : <CommentSection specialHeight={this.state.showComments ? "90%" : "initial"} comments={this.state.comments}/>
        }
       
        return(
       
                <article className="Article">
                    <div className="ModalPost">
                        <div className="InformationsAboutPost">
                            <p className="modal-title">{this.props.name}</p>
                            <div className="modal-date-title">
                                <span className="modal-user">{this.props.author}</span>
                                <span className="modal-date">{this.props.addDate}</span>
                            </div>
                            
                        </div>
                        <div className="ModalPostContent">
                            <span>
                                <p className="name-group">Nazwa grupy</p>
                                <span className="modal-content">{this.props.content}</span>
                            </span>
                            <div className="image-holder1">
                                <img src={Meme} alt="Meme"></img>
                            </div>
                        </div>
                    </div>
                    <div className="p-comments-holder">
                        <p onClick={this.showComments} className="Information">{this.state.showComments ? "Schowaj sekcję komentarzy" : "Kliknij, aby wyświetlić komentarze"}</p>
                        {Comments}
                    </div>
                    
            </article>
    
         
          
      
      
        );
    }
}
const mapStateToProps = state => {
    return {
        comments: state.userOptionsRed.comments,
        commentsSpinner: state.userOptionsRed.commentsSpinner,
        commentsErrorLoading: state.userOptionsRed.commentsErrorLoading

    };
}
const mapDispatchToProps = dispatch => {
    return {
        initializeComments: (id, oldComments) => dispatch(fetchingComments(id, oldComments))
    };
}
;
export default connect(mapStateToProps, mapDispatchToProps, null, {pure:false})(PostModalContent);
