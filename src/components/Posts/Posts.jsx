import React, { Component } from 'react';
import './Posts.css';
import Post from './Post/Post';
import Aux from '../../hoc/Auxi';
import UserNavbar from '../UserNavbar/UserNavbar';
import axios from '../../axios-groupsconnects';
import SmallSpinner from '../UI/SmallSpinner/SmallSpinner';

class Posts extends Component{
    state = {
        posts: [],
        loadingMorePostsSpinner: false,
        loadingMorePostsError: "",
        actualId: 0
    }
    componentDidMount() {
        this.postEnd.addEventListener("scroll", () => {
            if (
                this.postEnd.scrollTop + this.postEnd.clientHeight >=
                this.postEnd.scrollHeight
            ) {
              this.loadMoreItems();
            }
          });
    }
    componentDidUpdate(prevProps){
        if(prevProps.posts !== this.props.posts){
            this.setState({posts: this.props.posts, actualId: this.props.posts.length-1});
        }
    }
    
    loadMoreItems = () => {
        this.setState({ loadingMorePostsSpinner: true });
        const oldPosts = [...this.state.posts];
            axios.get('/api/posts/' + this.props.groupName + '/get10/' + oldPosts[this.state.actualId].id).then(response => {
                const data = oldPosts.concat(response.data);
                this.setState({loadingMorePostsSpinner: false, 
                    loadingMorePostsError: "", posts: data, actualId: this.state.actualId + response.data.length-1});
            }).catch(error => {
                this.setState({loadingMorePostsSpinner: false, loadingMorePostsError: "Błąd podczas ładowania"});
            })
    }
    render(){
        return(
            <Aux>
            <p className="event-info">Posty</p>
            <div className="post-two-elements-container">
                <ul className="post-block-container" 
                    ref={(el) => { this.postEnd = el; }} 
                    >
                    {this.props.loadingPostsError ? 
                        <p className="backdropo-error">{this.props.loadingPostsError}</p> : 
                        this.state.posts.map( item => {
                            return <Post 
                            key={item.id}
                            postId={item.id}
                            description={item.content}
                            postTitle={item.title}
                            addDate={item.creationDate}
                            userName={item.author.username}
                            authorAvatar={item.author.profilePicture}
                            sex={item.author.sex}
                            comments={item.comments}
                            postPicture={item.postPictures} />
                        })
                    }
                        
                        {!this.state.loadingMorePostsError ? <li className="spinner-cont"><SmallSpinner /></li>
                        : <li className="backdropo-error">{this.state.loadingMorePostsError}</li>}
                </ul>   
                <UserNavbar></UserNavbar>
            </div>
            
                
            
            
            </Aux>
        );
    }
}


export default Posts;



