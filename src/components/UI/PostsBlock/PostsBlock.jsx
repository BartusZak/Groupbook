import React, { Component } from 'react';
import Image from '../../../assets/img/404/404.jpg';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUserPostsActionCreator } from '../../../store/Posts/Actions';
import Spinner from '../Spinner/Spinner';
import {apiPicturesUrl} from '../../../axios/apiPicturesUrl';
import './PostsBlock.css';
import Modal from '../Modal/Modal';
import SinglePostDetails from './SinglePostDetails/SinglePostDetails'

class PostsBlock extends Component {
    state = {
        showSpinner: true,
        showPostDetails: false,
        singlePostData: null
    }
    componentDidMount(){
        const responseObject = JSON.parse(localStorage.getItem('responseObject'));
        this.props.fetchUserPosts(responseObject.id);
    }
    componentDidUpdate(prevProps){
        if(prevProps.fetchedPosts !== this.props.fetchedPosts 
            || prevProps.fetchingPostsErrors !== this.props.fetchingPostsErrors){
            this.setState({showSpinner: false});
        }
    }

    showPostDetails(i, e) { 
        console.log(i);
        this.setState({showPostDetails: !this.state.showPostDetails, singlePostData: i}); 
    }

    closePostDetails = () => {
        this.setState({showPostDetails: !this.state.showPostDetails}); 
    }
    render(){
        return(
            <div className="post-container">
                <p className="main-post-title">Posty opublikowane przez Ciebie</p>


                {this.state.showSpinner ? <Spinner /> : 
                this.props.fetchingPostsErrors.length > 0 ? <p className="server-error">{this.props.fetchingPostsErrors[0]}</p> : 
                this.props.fetchedPosts.posts === undefined ?  
                null : this.props.fetchedPosts.posts.reverse().map(i => {
                    let imageHolder = i.pictures.length > 0 ? "image-holder2" : "image-holder2 hideImageContainer";
                    return (
                    <div key={i.id} onClick={(e) => this.showPostDetails(i, e)} className="main-post-title-cont">
                        <p className="post-title-name">{i.title} </p>
                        <p className="main-post-date">
                            <b>Liczba komentarzy {i.comments === null ? 0 : i.comments.length}</b>
                            {i.creationDate.slice(0,10) + " " + i.creationDate.slice(11,16)}
                        </p>
                        <div className="single-post">
                            <div className={imageHolder}>
                            {(i.pictures.length > 0 ?
                                <img 
                                    src={apiPicturesUrl+i.pictures[0].mediumResolutionPicName} 
                                    onError={(e)=>{e.target.src=require('assets/img/404/error-image-generic.png')}} 
                                    alt="alt" />
                            :
                            null
                            )}
                            </div>
                            <p className="post-content">
                                    {i.content}
                            </p>
                        </div>
                    
                    </div>
                    );
                })}

                <Modal 
                    modalClass="modalabc"  
                    show={this.state.showPostDetails} 
                    clickedMethod={this.closePostDetails}>
                   
                    {(this.state.singlePostData !== null)? <SinglePostDetails post={this.state.singlePostData} postId={this.state.singlePostData.id}  />: null}
                    
                </Modal> 
            </div>

            
        );
    }
}

const mapStateToProps = state => {
    return {
        fetchedPosts: state.PostsReducer.fetchedPosts,
        fetchingPostsErrors: state.PostsReducer.fetchingPostsErrors
    };
}
const mapDispatchToProps = dispatch => {
    return {
        fetchUserPosts: (userId) => dispatch(fetchUserPostsActionCreator(userId))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(PostsBlock);
