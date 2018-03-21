import React, { Component } from 'react';
import './CommentSection.css';

const commentSection = (props) => {
    const comments = props.comments;
    return(
        <ul className="CommentSection">
           {comments.map(item => {
               return (
               <li key={item.addDate}>
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

export default commentSection;