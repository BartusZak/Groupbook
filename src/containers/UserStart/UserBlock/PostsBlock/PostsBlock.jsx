import React, { Component } from 'react';
import '../MessagesBlock/MessagesBlock.css';

class PostsBlock extends Component {

   

    render(){
        return(
            <div className="MessagesBlock">
                <b>Posty opublikowane przez Ciebie</b>
                <hr />
            </div>
        );
    }
}


export default PostsBlock;