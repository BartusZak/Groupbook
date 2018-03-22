import React, { Component } from 'react';
import './SinglePost.css';
import Image from '../../../assets/img/memeExample/meme.png';
import 'font-awesome/css/font-awesome.min.css';
import Comments from '../../../components/PostModalContent/CommentSection/CommentSection';
import { connect } from 'react-redux';
import { fetchingComments, updateComments } from '../../UserOptions/Store/actions';
import Spinner from '../../../components/UI/Spinner/Spinner';
import CommentSection from '../../../components/PostModalContent/CommentSection/CommentSection';

 
class SinglePost extends Component {
    state = {
            showComments: false,
            id: this.props.id,
            commentValue: ""
    }
    showCommentsHandler = () => { 
        let result = null;
        this.setState({showComments: !this.state.showComments});
        this.props.initializeComments(this.state.id, this.props.comments);  
    }
    onChangeHandler = (event) => { this.setState({...this.state, commentValue: event.target.value}) };
    render(){
        let Comments = null;
        if(this.props.commentsErrorLoading)
            Comments = <h4>Wystąpił błąd podczas wczytywania komentarzy</h4>;
        else
            Comments = this.state.showComments ? this.props.commentsSpinner ? <Spinner /> : this.props.comments.length > 0 ? 
            <CommentSection comments={this.props.comments}/> : 
            <h4 style={{marginTop: '20px'}}>Brak komentarzy pod postem</h4> : null;
    

     
        return (
            <div className="SinglePost">
            <h5 className="PostHeaders">{this.props.postTitle}</h5>
            <div className="PostSubHeader">
                <div className="Tags">
                    <span>#Problem #Inicjatywa</span>
                </div>
                <div className="InformationContainer">
                    <b>{this.props.name === undefined ? null : this.props.name}<span style={{color: 'red'}}>{this.props.userName === undefined ? "Anonim" : this.props.userName}</span></b>
                    
                    <span className="PostAddDate">
                        {this.props.addDate ? this.props.addDate.replace('AM' || 'PM', "") : "19-12-2016 16:45"}
                    </span> 
                    <i className="fa fa-comment"><b className="comments-number">10</b></i>          
                </div>
                <div className="PostDescription">
                    <span>{this.props.description}</span>
                </div>
                <div className="ImageDescHolder">
                    <div className="PostImage">
                        <img src={Image} alt="Ciekawy jestem co z tego bedzie" />
                    </div>
                </div>
                <div className="ComentSection">
                    <p className="CommentOptions"> Sekcja komentarzy </p>
                    <textarea onChange={(event) => this.onChangeHandler(event)} value={this.state.commentValue} placeholder="Dodaj komentarz">
                    </textarea>
                    <i onClick={() => this.props.updateComments(this.state.commentValue, this.state.id, this.props.author === "" ? "Anonim" : this.props.author)} className="fa fa-plus"></i> 
                    <i onClick={() => this.showCommentsHandler()} className="fa fa-reply-all"></i>
                    

                </div>

                {Comments}
            
                
            </div>
        </div>
        );
    }
}

 

const mapStateToProps = state => {
    return {
        comments: state.userOptionsRed.comments,
        commentsSpinner: state.userOptionsRed.commentsSpinner,
        commentsErrorLoading: state.userOptionsRed.commentsErrorLoading,
        author: state.logRed.userName

    };
}
const mapDispatchToProps = dispatch => {
    return {
        initializeComments: (id, oldComments) => dispatch(fetchingComments(id, oldComments)),
        updateComments: (newComment, comments, author) => dispatch(updateComments(newComment, comments, author))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(SinglePost);


