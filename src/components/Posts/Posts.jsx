import React, { Component } from 'react';
import './Posts.css';
import Post from './Post/Post';
import Aux from '../../hoc/Auxi';
import UserNavbar from '../UserNavbar/UserNavbar';
import axios from 'axios/axios-groupsconnects';
import Spinner from '../UI/Spinner/Spinner';

class Posts extends Component{
    state = {
        posts: [],
        loadingMorePostsError: "",
        actualId: 0,
        loadingPostsSpinner: true,

        loadingMorePostsSpinner: false
    }
    componentDidUpdate(prevProps){
        if(prevProps.posts !== this.props.posts){
            this.setState({posts: this.props.posts, loadingPostsSpinner: false});
        }

    }
    loadMoreItems = () => {
        if(this.state.posts.length > 0){
            if(this.postEnd.scrollTop + this.postEnd.clientHeight >= this.postEnd.scrollHeight){
                this.setState({loadingMorePostsSpinner: true});
                console.log(this.state.posts);
                let newPosts = [...this.state.posts];
                const lastId = this.state.posts[this.state.posts.length-1].id;
                axios.get('/api/posts/' + this.props.groupName +'/get10/' + lastId).then(response => {
                    newPosts = newPosts.concat(response.data);
                    this.setState({posts: newPosts, loadingMorePostsError: "", loadingMorePostsSpinner: false});
                }).catch(error => {
                    this.setState({loadingMorePostsSpinner: false, loadingMorePostsError: "Wystąpił błąd podczas ładowania postów"});
                })
            }
            
        }
        

    }
    render(){
        return(
            <Aux>
            <p className="event-info">Posty</p>
            <div className="post-two-elements-container">
            {this.state.loadingPostsSpinner ? <div className="center-spinner"><Spinner /></div> : 
                <Aux>
                    {this.state.posts.length === 0 ? <p className="empty-content-in-group">
                        W tej grupie nie ma żadnych postów
                    </p> : 
                    <ul onScroll={this.loadMoreItems} className="post-block-container" 
                        ref={(el) => { this.postEnd = el; }} 
                        >
                        { this.state.posts ?
                            
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
                        : null}
                        
                    </ul>
                    }   
                    
                    <UserNavbar></UserNavbar>   
                </Aux>
            }
                
                
           
                    
              
                
                
            </div>
            {this.state.loadingMorePostsSpinner ? 
            <div className="bottom-spinner"><Spinner /></div>
            : null}
           
            
                
            
            
            </Aux>
        );
    }
}


export default Posts;



