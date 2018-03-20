import React, { Component } from 'react';
import './SinglePost.css';
import Image from '../../../assets/img/memeExample/meme.png';
import 'font-awesome/css/font-awesome.min.css';
import Comments from '../../../components/PostModalContent/CommentSection/CommentSection';
import { connect } from 'react-redux';
import { fetchingComments } from '../../UserOptions/Store/actions';
import Spinner from '../../../components/UI/Spinner/Spinner';
import CommentSection from '../../../components/PostModalContent/CommentSection/CommentSection';

 
class SinglePost extends Component {
    state = {
            showComments: false,
            id: this.props.id
    }
    showCommentsHandler = () => { 
        let result = null;
        this.setState({showComments: !this.state.showComments});
        this.props.initializeComments(this.state.id, this.props.comments);  
  
    }

s
    render(){
        let Comments = null;
        if(this.props.commentsErrorLoading)
            Comments = <h4>Wystąpił błąd podczas wczytywania komentarzy</h4>;
        else
            Comments = this.state.showComments ? this.props.commentsSpinner ? <Spinner /> : <CommentSection comments={this.props.comments}/> : null;


     
        return (
            <div className="SinglePost">
            <h4 className="PostHeaders">Nagłówek postu</h4>
            <div className="PostSubHeader">
                <div className="Tags">
                    <span>{this.props.postTitle}</span>
                </div>
                <div className="InformationContainer"v>
                    <b>Tomasz Protesiuk <br/><span style={{color: 'red'}}>({this.props.userName})</span></b>
                    <i className="fa fa-comment"><b className="comments-number">10</b></i>
                    <span className="PostAddDate">
                        {this.props.addDate ? this.props.addDate : "19-12-2016 16:45"}
                    </span>           
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
                    <p className="CommentOptions"> Sekcja komentarzy</p>
                    <textarea placeholder="Dodaj komentarz">
                    </textarea>
                    <i onClick={this.props.addComment} class="fa fa-plus"></i> 
                    <i onClick={() => this.showCommentsHandler()} class="fa fa-reply-all"></i>
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
        commentsErrorLoading: state.userOptionsRed.commentsErrorLoading
    };
}
const mapDispatchToProps = dispatch => {
    return {
        initializeComments: (id, oldComments) => dispatch(fetchingComments(id, oldComments))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(SinglePost);


