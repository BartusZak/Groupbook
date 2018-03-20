import React from 'react';
import './CommentSection.css';


const commentSection = (props) => {
    const comments = props.comments;
    return(
        <ul className="CommentSection">
           {comments.map(item => {
               return (
               <li key={item.id}>
                  <span className="CommentInfo">
                    <b>{item.email}</b>
                    <b>19-12-2015 16:45</b>
                  </span>
                  <span className="CommentBody">
                    {item.body}
                  </span>
               </li>
               );
           })}
        </ul>
    );
}

export default commentSection;