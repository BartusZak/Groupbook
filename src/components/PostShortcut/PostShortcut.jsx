import React, { Component } from 'react';
import './PostShortcut.css';
import Button from '../UI/Button';
import SmallPost from './SmallPost/SmallPost';
import Facet from '../../assets/img/profiles/facet.jpg';
import Aux from '../../hoc/Auxi';
import Modal from '../UI/Modal/Modal';
import axios from '../../axios-post';
import Spinner from '../UI/Spinner/Spinner';
import PostModalContent from '../PostModalContent/PostModalContent';
import CommentSection from '../PostModalContent/CommentSection/CommentSection';


class PostShortcut extends Component{
    state = {
        isModalShow: false,
        data: [],
        showSpinner: false,
        error: false,
        idToShowCommentSection: "",

        comments: [],
        commentError: false,
        showCommentsSpinner: false,
        isCommentsWasShowBefore: false,
        commentsSectionShow: false,

     
      
   
    }

    hideModal = () => {
        this.setState({isModalShow: false, isCommentsWasShowBefore: false, commentsSectionShow: false});
    }
    showModal = (id) => {
        let oldData = [...this.state.data];
        this.setState({isModalShow: true, showSpinner: true, error: false});
  
        axios.get('/posts/'+id).then(response => {
            oldData = response.data;
            this.setState({showSpinner: false, data: oldData, idToShowCommentSection: id});
        }).catch(error => {
            this.setState({showSpinner: false, error: true});
        });
     
    }
    hideComments = () => {
        this.setState({commentsSectionShow: !this.state.commentsSectionShow});
    }
    showCommentSectionClickHandler = () => {
            let oldData = [...this.state.comments];
            this.setState({modalTransition: true,
             showCommentsSpinner: true,
             commentError: false,
             isCommentsWasShowBefore: true,
             commentsSectionShow: !this.state.commentsSectionShow });

            axios.get('/posts/' + this.state.idToShowCommentSection + '/comments').then(response => {
                oldData = response.data;
                this.setState({showCommentsSpinner: false, comments: oldData});
            }).catch(error => {
                this.setState({showCommentsSpinner: false, commentError: true, commentsSectionShow: false});
            });      
    }
     
    render(){
        let postModalContent = null;
        const requestData = this.props.data;
        let postShortcut = null;
        let commentSection = null;

        if(this.props.error){
            postShortcut = <h1>Wystąpił błąd podczas komunikacji z serwerem</h1>;
        }
        else{
            postShortcut = (
                <Aux>   
                       <Button title="Dodaj post" class="margins" url="/logged/newpost"/>
                        {requestData.map(item => {
                            return <SmallPost 
                            author={item.id} 
                            key={item.id} 
                            postContent={item.title}
                            image={Facet}
                            clicked={(id) => this.showModal(item.id)} />;
                        })}
                        <Button title="Następne" clicked={this.props.clicked}/>
                </Aux>
            );
        }

        if(this.state.error){
            postModalContent = <h2>Wystąpił problem podczas wczytywania danych</h2>;
        }
        else{
            postModalContent = (this.state.showSpinner ? <Spinner /> : 
            <PostModalContent
            name={this.state.data.title}
            content={this.state.data.body}
            addDate="19-12-2016 16:45"
            author="JohnTorpeda2014"
            ShowingCommentSection={this.showCommentSectionClickHandler} />
             );
        }
        if(this.state.isCommentsWasShowBefore){
            if(this.state.commentError){
                commentSection = <h4>Wystąpił błąd podczas wczytywania komentarzy</h4>;
            }
            else{
                commentSection = this.state.showCommentsSpinner ? <Spinner /> : !this.state.commentsSectionShow ? null : <CommentSection comments={this.state.comments} />;
            }
        }

        const CommentsButton = ( this.state.commentsSectionShow ? <p className="Information" onClick={this.hideComments}>Schowaj komentarze</p> :
        <p className="Information" onClick={this.showCommentSectionClickHandler}>Kliknij, aby wyświetlić komentarze </p>);  
        
         return(   
            <Aux>
                <Modal 
                    show={this.state.isModalShow} clickedMethod={this.hideModal}>
                    {postModalContent}
                    {CommentsButton}
                    {commentSection}
                        
                </Modal>
                <Modal show={this.state.showAddPostModal} clickedMethod={this.hideModal}>
                    <div className="AddNewPost"></div>
                    <h1>Dodaj nowy post</h1>
                </Modal>


                <div className="PostShortcut">
                    {postShortcut}
                </div>
            </Aux>
           
        );
    }
}


export default PostShortcut;