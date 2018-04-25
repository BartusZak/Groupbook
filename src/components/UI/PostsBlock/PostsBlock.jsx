import React, { Component } from 'react';
import Image from '../../../assets/img/404/404.jpg';
import { PostBlockDiv } from './PostBlockStyle';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUserPostsActionCreator } from '../../../store/Posts/Actions';
import Spinner from '../Spinner/Spinner';
import {apiPicturesUrl} from '../../../axios/apiPicturesUrl';


class PostsBlock extends Component {
    state = {
        showSpinner: true
    }
    componentDidMount(){
        const responseObject = JSON.parse(localStorage.getItem('responseObject'));
        this.props.fetchUserPosts(responseObject.id);
        this.setState({showSpinner: false});
    }

    render(){
        console.log(this.props.fetchedPosts.posts);
        return(
            <PostBlockDiv>
            <div className="post-container">
                <p className="main-post-title">Posty opublikowane przez Ciebie</p>
            
                {this.state.showSpinner ? <Spinner /> :
                this.props.fetchedPosts.posts === undefined ? 
                null : this.props.fetchedPosts.posts.map(i => {
                    return (
                    <div key={i.id} className="main-post-title-cont">
                        <p className="group-name-title">{i.title} </p>
                        <p className="main-post-date">
                            {i.creationDate.slice(0,10) + " " + i.creationDate.slice(11,16)}
                        </p>
                        <div className="single-post">
                            <div className="image-holder2">
                                <img src={i.pictures.length > 0 ? 
                                    apiPicturesUrl+i.pictures[0].mediumResolutionPicName : null} alt="alt" />
                                <span className="post-title">
                                    {i.content}
                                    
                                </span>
                            </div>

                        
                        </div>
                    
                    </div>
                    );
                })}

                
            </div>

            
            </PostBlockDiv>
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
