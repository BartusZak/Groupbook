import React, { Component } from 'react';
import './Posts.css';
import Post from './Post/Post';
import Aux from '../../hoc/Auxi';
import UserNavbar from '../UserNavbar/UserNavbar';
import axios from '../../axios-groupsconnects';
class Posts extends Component{
    state = {
        posts: [],
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
            this.setState({posts: this.props.posts});
        }
    }
    loadMoreItems = () => {
        this.setState({loadingMorePostsSpinner: true});
        let newPosts = [...this.state.posts];
        const lastId = this.state.posts[this.state.posts.length-1].id;
        axios.get('/api/posts/' + this.props.groupName +'/get10/' + lastId).then(response => {
            newPosts = newPosts.concat(response.data);
            this.setState({posts: newPosts, loadingMorePostsError: ""});
        }).catch(error => {
            this.setState({loadingMorePostsError: "Wystąpił błąd podczas ładowania postów"});
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
                            userName={(item.author != null)? item.author.username: null}
                            authorAvatar={(item.author != null)?item.author.profilePicture: null}
                            sex={(item.author != null)?item.author.sex:null}
                            comments={item.comments}
                            postPicture={item.pictures} />
                        })
                    }
                     
                </ul>   
                <UserNavbar></UserNavbar>
            </div>
            
                
            
            
            </Aux>
        );
    }
}


export default Posts;



