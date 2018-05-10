import React, { Component } from 'react';
import './Posts.css';
import Post from './Post/Post';
import Aux from '../../hoc/Auxi';
import UserNavbar from '../UserNavbar/UserNavbar';
import axios from 'axios/axios-groupsconnects';
import Spinner from '../UI/Spinner/Spinner';
import ConfirmModal from '../UI/ConfirmPrompt/ConfirmPrompt';
import { connect } from 'react-redux';
import { deletePostActionCreator } from '../../store/Posts/Actions';

class Posts extends Component{
    state = {
        posts: [],
        loadingMorePostsError: "",
        actualId: 0,
        loadingPostsSpinner: true,

        loadingMorePostsSpinner: false,

        openDeleteModal: false,
        postToDelete: null,
        postDeleteSpinner: false,
        postDeletePrompt: null
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.deletePostErrors !== this.props.deletePostErrors){
            this.setState({postDeleteSpinner: false, postDeletePrompt: true});
            setTimeout( () => {
                this.setState({postDeletePrompt: null});
            }, 3000);

            if(nextProps.deletePostErrors.length === 0 && nextProps.deletePostResult){
                let newPosts = [...this.state.posts];
                const index = newPosts.findIndex(i => {
                    return i.id === this.state.postToDelete.id
                });
                newPosts.splice(index, 1);
                this.setState({posts: newPosts, openDeleteModal: false});
            }
        }
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
    deletePostHandler = () => {
        this.setState({postDeleteSpinner: true});
        const responseObject = JSON.parse(localStorage.getItem('responseObject'));
        this.props.deletePost(responseObject.token, this.state.postToDelete.id);
        
    }

    changeChangedPost = () => {
        if(this.props.editedPost){
            const newPosts = [...this.state.posts];
            const index = newPosts.findIndex(i => {
                return i.id === this.props.editedPost.id
            })
           
            newPosts[index].title = this.props.editedPost.title;
            newPosts[index].content = this.props.editedPost.content;
            newPosts[index].pictures = this.props.editedPost.pictures
            this.setState({posts: newPosts});
        }
        // educka zdkeco zpsta;a
        
    }
    render(){
        return(
            <Aux>
                {this.state.postDeletePrompt === null ? null :

                <p className={`small-prompt ${this.props.deletePostErrors.length > 0 ?
                "small-prompt-red" : "small-prompt-green"}`}>
                    <i className={`fa ${this.props.deletePostErrors.length > 0 ? "fa-times" : "fa-check"}`}></i>
                    {this.props.deletePostErrors.length > 0 ? 
                    this.props.deletePostErrors[0] : "Operacja wykonana pomyślnie"}
                </p>}


            {this.state.openDeleteModal ? 
                <ConfirmModal close={() => this.setState({openDeleteModal: false})}
                show={this.state.openDeleteModal} message={`Pamietaj, że ta operacja jest nie odwracalna. Jeżeli sie pomyliłeś 
                i jesteś autorem postu ${this.state.postToDelete.title}, możesz dokonac jego edycji. Czy chcesz
                usunąc post?`} 
                btnName="Usuń post" action={this.deletePostHandler} 
                animation={this.state.postDeleteSpinner}
                spinnerText="trwa usuwanie postu"
                error={this.state.postDeletePrompt} 
                /> : null
            }
            
            

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
                                isUserGroupLeader={this.props.isUserGroupLeader}
                                openDeleteModal={() => this.setState({openDeleteModal: true, postToDelete: item})}
                                changeChangedPost={this.changeChangedPost}
                                showModal={this.state.openDeleteModal}
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

const mapStateToProps = state => {
    return {
        deletePostErrors: state.PostsReducer.deletePostErrors,
        deletePostResult: state.PostsReducer.deletePostResult,
        editedPost: state.PostsReducer.editedPost
    };
}

const mapDispatchToProps = dispatch => {
    return {
        deletePost: (token, postId) => dispatch(deletePostActionCreator(token, postId))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Posts);





