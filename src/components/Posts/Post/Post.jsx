import React, { Component } from 'react';
import CommentSection from '../../CommentSection/CommentSection';
import Image from '../../../assets/img/profiles/facet.jpg';
import 'font-awesome/css/font-awesome.min.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import ImagePost from '../../../assets/img/404/404.jpg';
import Aux from '../../../hoc/Auxi';
import EmptyAvatarMan from '../../../assets/img/empty_avatars/empty_avatar_man.jpg';
import EmptyAvatarGirl from '../../../assets/img/empty_avatars/empty-avatar-girl.jpg';
import {apiPicturesUrl} from 'axios/apiPicturesUrl';
import './Post.css';
import { validateInput, validatePictures } from '../../../containers/UserOptions/Validation/Validation';
import Button from '../../UI/Button/Button';
import OnInputEdit from '../../Edit/OneInputEdit';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import { editPostActionCreator, fetchEditPost, editPostPictureActionCreator } from '../../../store/Posts/Actions';
import OwnSpinner from '../../UI/OwnSpinner/OwnSpinner';

class Post extends Component{
    state = {
        showComments: false,
        showPicture: false,
        postId: this.props.postId,
        editBlock: false,
        count: 0,

        changeArray: [
            {error: "", value: ""},
            {error: "", value: ""},
            {error: "", value: []}
        ],

        blockId: 0,
        files: [],
        addFilesError: "",

        showEditPrompt: null,

        changeSpinner: false
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.editPostErrors !== this.props.editPostErrors){
            this.setState({changeSpinner: false, showEditPrompt: true});
            setTimeout(() => {
                this.setState({showEditPrompt: null});
            }, 3000);
        }
        if(nextProps.editedPost !== this.props.editedPost && this.state.blockId === 2){
            this.setState({files: nextProps.editedPost.pictures});
        }
    }

    showCommentsClickHandler = () => { 
        this.setState({showComments: !this.state.showComments});
    }

    showPostPicture = () => { this.setState({showPicture: !this.state.showPicture}); }

    checkIsUserPostOwner = () => {
        const responseObject = JSON.parse(localStorage.getItem('responseObject'));
        if(responseObject.username === this.props.userName)
            return true;

        return false;
    }
    onEditHandler = (e, id) => {
        const newChangeArray = [...this.state.changeArray];
        newChangeArray[id].value = e.target.value;
        newChangeArray[id].error = id === 0 ? 
        validateInput(2,100, 
            newChangeArray[id].value, this.props.postTitle, "", "", "tytuł postu", "standard") :
        validateInput(5, 255, 
            newChangeArray[id].value, this.props.description, "", "", "treść postu", "standard");
        
        this.setState({changeArray: newChangeArray});
    }
    
    editPostHandler = (e, id) => {
        e.preventDefault();
        const newChangeArray = [...this.state.changeArray];

        const result = id === 0 ? 
        validateInput(2,100, 
            newChangeArray[id].value, this.props.postTitle, "", "", "tytuł postu", "standard") :
        validateInput(5, 255, 
            newChangeArray[id].value, this.props.description, "", "", "treść postu", "standard");
        

        if(result){
            newChangeArray[id].error = result;
            this.setState({changeArray: newChangeArray});
        }
        else{
            this.setState({editPostSpinner: true, changeSpinner: true});
            const responseObject = JSON.parse(localStorage.getItem('responseObject'));
            this.props.editPost(responseObject.token, this.state.changeArray[0].value,
                this.state.changeArray[1].value, this.props.postId, this.props.postTitle, this.props.description);
        }
        
    }
   
    onDropHandler = files => {
        const result = validatePictures(files[0].type, 200000, files[0].size);
        if(result === ""){
            const responseObject = JSON.parse(localStorage.getItem('responseObject'));
            this.setState({changeSpinner: true});
            this.props.editPostPicture(this.props.post, files, this.props.currentObject, responseObject.token);
        }
        this.setState({addFilesError: result}); 
    }

    changePosts = () => {
        this.setState({editBlock: false,
            changeArray: [{error: "", value:""}, {error: "", value: ""}], blockId: 0, files: []})
        this.props.changeChangedPost();
    }
    checkIsUserTagged = comments => {
        if(comments.length === 0)
            return false;

        const tagsArray = [];
        const responseObject = JSON.parse(localStorage.getItem('responseObject'));
        for(let key in comments){
            if(comments[key].tags.length > 0){
                for(let keyo in comments[key].tags){
                    tagsArray.push(comments[key].tags[keyo]);
                }
            }
        }
      
        
        for(let key in tagsArray)
            if(tagsArray[key].taggedUser.username === responseObject.username)
                return true;
        
        return false;

    }
    render(){
        const isUserTagged = this.checkIsUserTagged(this.props.comments);
        console.log(isUserTagged);
        const Content = this.state.showComments ? this.props.commentsErrorLoading ? 
        <h5 className="loading-error-eessage">Wystąpił błąd podczas ładowania komentarzy</h5> : 
        <CommentSection 
        users={this.props.users}
        comments={this.props.comments}
        PostId={this.state.postId}/> : null; 
        return(
            <Aux>
                {!this.state.editBlock ?  
                  <li className={isUserTagged ? "tagged-class" : null}>
                    
                  <p className="post-block-add-date">
                  {this.props.addDate.slice(0,10) + " " + this.props.addDate.slice(11,16)}</p>
                  <div className="flex-cont">
                      <div className="post-block-image-holder">
                          <img src={!this.props.authorAvatar ? 
                          this.props.sex ? EmptyAvatarGirl : 
                          EmptyAvatarMan : apiPicturesUrl + 
                          this.props.authorAvatar.avatar
                          } alt="Opis"
                          onError={(e)=>{e.target.src=require('assets/img/404/error-image-generic.png')}}/>
                      </div>
                      <p className="post-block-author">{this.props.userName && this.props.userName}</p>

                     
                      <div className="user-post-options-block">
                        {this.checkIsUserPostOwner() ? 
                        <i onClick={() => this.setState({editBlock: true, count: 10})} className="fa fa-edit"></i> 
                        : null}

                        {(this.checkIsUserPostOwner() || this.props.isUserGroupLeader) ? 
                        <i onClick={this.props.openDeleteModal} className="fa fa-trash"></i> : null}
                      </div>
                      
                      

                  </div>    
                  <div className="post-block-title">
                      <span>{this.props.postTitle}</span> 

                      {this.props.postPicture ? this.props.postPicture.length > 0 ? 
                      <i onClick={this.showPostPicture} className="fa fa-image"></i> : null : null}
                      
                          
                  </div>
                  <article>{this.props.description}</article>
                          
                      
                  <p onClick={this.showCommentsClickHandler} 
                  className="add-comment-button">{this.state.showComments ? 
                      "Schowaj komentarze" : "Pokaż komentarze"
                  }</p>
                  {Content}
                  
                </li>

                : 

                <li className={isUserTagged ? "tagged-class" : null}>
                    <div className="edit-post-form">
                        <nav>
                            <Button disabled={this.state.changeArray[0].error ? true : false} 
                            content={<i className="fa fa-align-justify"></i>} clicked={() => this.setState({blockId: 0, 
                            changeArray: [{error: "", value:""}, {error: "", value: ""}],
                            files: [], addFilesError: ""})}
                            btnClass={`circle-button ${this.state.blockId === 0 ? "ac-butt" : null} 
                            ${this.state.changeArray[0].error ? "disabled-btn" : null}`}/>
                            
                            <Button content={<i className="fa fa-align-justify"></i>}
                            clicked={() => this.setState({blockId: 1, changeArray: [{error: "", value:""}, {error: "", value: ""}], files: [], addFilesError: ""})} 
                            btnClass={`circle-button ${this.state.blockId === 1 ? "ac-butt" : null}`} />

                            <Button content={<i className="fa fa-photo"></i>} 
                            clicked={() => this.setState({blockId: 2, changeArray: [{error: "", value:""}, {error: "", value: ""}], files: [], addFilesError: ""})} 
                            btnClass={`circle-button ${this.state.blockId === 2 ? "ac-butt" : null}`}/>
                        </nav>

                        <Button clicked={this.changePosts}
                            btnClass={`circle-button btn-exit`} content={<i className="fa fa-times"></i>}/>
                        
                        {this.state.blockId === 0 ? 
                            <section className="change-title-area">
                                <label>Nowy tytuł</label>
                                <div className="input-holder-area">
                                    <OnInputEdit btnContent={<i className="fa fa-edit"></i>} 
                                    other={true} btnClass="circle-button" placeholder={this.props.postTitle} 
                                    newName={this.state.changeArray[0].value} 
                                    error={this.state.changeArray[0].error}
                                    onEditHandler={e => this.onEditHandler(e, 0)}
                                    editGroupHandler={e => this.editPostHandler(e, 0)} 
                                    /> 
                                </div>
                                                       
                            </section>
                        : null}
                        
                        {this.state.blockId === 1 ? 

                        <section className="change-title-area">
                            <label>Nowa treść postu</label>
                            <textarea onChange={e => this.onEditHandler(e, 1)} 
                            placeholder={this.props.description}></textarea>

                            {this.state.changeArray[1].error ? 
                            <p className="area-val-mesg">{this.state.changeArray[1].error}</p>
                            : null}  

                            <Button disabled={this.state.changeArray[1].error ? true : false} 
                            content="Zapisz" clicked={e => this.editPostHandler(e, 1)}
                            btnClass={`uni-btn join-event  ${this.state.changeArray[1].error ? "disabled-btn" : null}`}
                            />
                        </section> : null}
                        
                        {this.state.blockId === 2 ? 
                        <div className="drop-zone-post">
                            <Dropzone onDrop={this.onDropHandler} className="user-opts-deny">
                            <Button
                            btnClass="change-photo" 
                            content={<Aux><span>Zmień zdjęcie postu</span><i className="fa fa-photo"></i></Aux>} />
                            
                            </Dropzone>
                            <div style={{backgroundImage: 
                                `url(${ this.state.files.length > 0 ? 
                                apiPicturesUrl + this.state.files[0].fullResolutionPicName :
                                this.props.postPicture.length > 0 ? 
                                apiPicturesUrl + 
                                this.props.postPicture[0].fullResolutionPicName : null})`}} 

                                className="drop-preview">
                            </div>

                            {this.state.addFilesError ? 
                            <p className="validation-message">{this.state.addFilesError}</p> : null}
                            
                            
                        </div>
                         : null} 
                        
                        {this.state.changeSpinner ? 
                        <div style={{bottom: this.state.blockId === 2 ? "160px" : "15px"}} className="own-spinner-container">
                            <OwnSpinner spinnerText="trwa edycja..."/>     
                        </div> : null}
                        
                    </div>
                </li>
                
                
                }
               
                
                {this.props.postPicture ? 
                <Backdrop show={this.state.showPicture} clicked={this.showPostPicture}>
                <div className="image-container" style={{display: this.state.showPicture ? 'initial' : 'none'}}>
                    {this.props.postPicture.length > 0 ? 
                    <img src={this.props.postPicture[0].preview ? 
                        this.props.postPicture[0].preview : 
                        apiPicturesUrl + this.props.postPicture[0].fullResolutionPicName} alt="Zdjęcie" onError={(e)=>{e.target.src=require('assets/img/404/error-image-generic.png')}} />
                    : null}
                </div>
                </Backdrop> : null
                }          
                

                {this.state.showEditPrompt === null ? null :
                <p className={`small-prompt ${this.props.editPostErrors.length > 0 ?
                "small-prompt-red" : "small-prompt-green"}`}>
                    <i className={`fa ${this.props.editPostErrors.length > 0 ? "fa-times" : "fa-check"}`}></i>
                    {this.props.editPostErrors.length > 0 ? 
                    this.props.editPostErrors[0] : "Operacja wykonana pomyślnie"}
                </p>}
            </Aux>    
           
        );
    }
}
const mapStateToProps = state => {
    return {
        editPostResult: state.PostsReducer.editPostResult,
        editPostErrors: state.PostsReducer.editPostErrors,
        editedPost: state.PostsReducer.editedPost
    };
}

const mapDispatchToProps = dispatch => {
    return {
        editPost: (token, Name, Description, postId, currName, currDesc) => dispatch(editPostActionCreator(token, Name, Description, postId, currName, currDesc)),
        editPostPicture: (addedPosts, pictures, currentObject, token) => dispatch(editPostPictureActionCreator(addedPosts, pictures, currentObject, token))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Post);



