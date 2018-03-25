import React, { Component } from 'react';
import './Posts.css';
import Post from './Post/Post';
import Aux from '../../hoc/Auxi';
class Posts extends Component {
    render(){
        return(
            <Aux>
                <p className="event-info">Posty</p>
                <Post postId={1}/>
                <Post postId={2}/>
                <Post postId={3}/>
                <Post postId={4}/>
            </Aux>
        );
    }
}

export default Posts;



