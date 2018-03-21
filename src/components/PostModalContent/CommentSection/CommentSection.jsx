import React, { Component } from 'react';
import './CommentSection.css';
import { connect } from 'react-redux'; 

class CommentSection extends Component{
    state = {
        comments: this.props.comments
    }
    render(){
        
        
        return(
        <ul className="CommentSection">
           {this.state.comments.map(item => {
               return (
               <li key={item.addDate+item.author}>
                  <span className="CommentInfo">
                    <b>{item.author}</b>
                    <b>{item.addDate}</b>
                  </span>
                  <span className="CommentBody">
                    {item.content}
                  </span>
               </li>
               );
           })}
        </ul>
        );
    }
}


export default CommentSection;