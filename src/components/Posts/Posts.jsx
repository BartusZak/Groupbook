import React, { Component } from 'react';
import './Posts.css';
import Post from './Post/Post';
import Aux from '../../hoc/Auxi';

const posts = (props) => {
    return(
        <Aux>
            <p className="event-info">Posty</p>
            {Object.keys(props.posts)
            .map( igKey => {
                return [...Array(props.posts[igKey])].map((item,i) => {
                    return <Post key={igKey} postId={1} 
                    description={item.postContent} 
                    postTitle={item.postTitle}
                    addDate={item.addDate}
                    userName={item.userName}/>    
                });
            })}
        </Aux>
    );
}


export default posts;



