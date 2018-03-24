import React, { Component } from 'react';
import Aux from '../../hoc/Auxi';
import './PostBlock.css';
import Image from '../../assets/img/profiles/facet.jpg';
import CommentSection from '../../components/PostModalContent/CommentSection/CommentSection';
import { connect } from 'react-redux';
import { fetchingComments } from '../../containers/UserOptions/Store/actions';
import Loader from '../UI/Loader/Loader';
class PostBlock extends Component {
    state = {
        showComments: false,
        loadedComments: []
    }
    
    showCommentsClickHandler = () => { 
        this.setState({showComments: !this.state.showComments, showLoader: true});
        if(this.state.loadedComments.length === 0 ) this.setState({loadedComments: this.props.fetchingComments(1), showLoader: false});
    }
    //<Loader width="35px" height="35px" />
    render(){
        const Comments = this.state.showComments ? 
            <CommentSection comments={this.state.loadedComments} /> : null;
        return(
            <Aux>
                <p className="event-info">Posty</p>
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
                                    Problem z mlodszym bratem
                            </p>
                            <article>
                                dsad asd asdsadad asdsa asdasdsa dasdsad asdas asdsad dssadsa saadadsadsadsa
                                dasdsadsadsadsa aasdsadsad adsad asdsad ssad ad asdsa ad
                            </article>
                            <p onClick={this.showCommentsClickHandler} className="add-comment-button">{this.state.showComments ? "Schowaj komentarze" : "Pokaż komentarze"}</p>
                            {Comments}
                        
                        </li>
                    </ul>
                    <div className="additionals">jhjhj</div>
                </div>
            </Aux>
        );
    }
}
const mapStateToProps = state => {
    return {
        comments: state.userOptionsRed.comments,
        commentsErrorLoading: false
    };
}
const mapDispatchToProps = dispatch => {
    return {
        fetchingComments: (id) => dispatch(fetchingComments(id))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(PostBlock);


