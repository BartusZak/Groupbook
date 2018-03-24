import React, { Component } from 'react';
import './CommentSection.css';
import 'font-awesome/css/font-awesome.min.css';
class CommentSection extends Component{
    state = {
        comments: this.props.comments
    }
    render(){
        return(
            <ul className="CommentSection">
                <li className="add-comment-area">
                    <textarea placeholder="Dodaj nowy komentarz..."></textarea>
                    <button className="add-comment-gr-button">
                        Dodaj komentarz <i class="fa fa-plus"></i>
                    </button>
                  
                </li>
                {this.state.comments.map(item => {
                    return (
                    <li key={item.addDate+item.author}>
                        <span className="CommentInfo">
                            <b>{item.author === undefined ? item.email : item.author }</b>
                            <b>{item.addDate === undefined ? "19-12-2016 16:45" : item.addDate }</b>
                        </span>
                        <span className="CommentBody">
                            {item.content === undefined ? item.body : item.content}
                        </span>
                    </li>
                    );
                })}
            </ul>
        );
    }
}


export default CommentSection;