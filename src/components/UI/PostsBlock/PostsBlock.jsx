import React, { Component } from 'react';
import Image from '../../../assets/img/404/404.jpg';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUserPostsActionCreator } from '../../../store/Posts/Actions';
import Spinner from '../Spinner/Spinner';
import {apiPicturesUrl} from '../../../axios/apiPicturesUrl';
import './PostsBlock.css';

class PostsBlock extends Component {
    state = {
        showSpinner: true
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
    render(){
        console.log(this.props.fetchingPostsErrors);
        return(
            <div className="post-container">
                <p className="main-post-title">Posty opublikowane przez Ciebie</p>


                {this.state.showSpinner ? <Spinner /> : 
                this.props.fetchingPostsErrors.length > 0 ? <p className="server-error">{this.props.fetchingPostsErrors[0]}</p> : 
                this.props.fetchedPosts.posts === undefined ? 
                null : this.props.fetchedPosts.posts.map(i => {
                    return (
                    <div key={i.id} className="main-post-title-cont">
                        <p className="post-title-name">{i.title} </p>
                        <p className="main-post-date">
                            <b>Liczba komentarzy {i.comments === null ? 0 : i.comments.length}</b>
                            {i.creationDate.slice(0,10) + " " + i.creationDate.slice(11,16)}
                        </p>
                        <div className="single-post">
                            <div className="image-holder2">
                                <img src={i.pictures.length > 0 ? 
                                    apiPicturesUrl+i.pictures[0].mediumResolutionPicName : null} alt="alt" />
                            </div>
                            <p className="post-content">
                                    {i.content}
                            </p>
                        </div>
                    
                    </div>
                    );
                })}

                
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
