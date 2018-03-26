import React from 'react';
import './Posts.css';
import Post from './Post/Post';
import Aux from '../../hoc/Auxi';
import UserNavbar from '../UserNavbar/UserNavbar';

const posts = (props) => {
    return(
        <Aux>
            <p className="event-info">Posty</p>
            <div className="post-two-elements-container">
                <ul className="post-block-container">
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
                </ul>
                <UserNavbar></UserNavbar>
            </div>
        </Aux>
        );
}
export default posts;



