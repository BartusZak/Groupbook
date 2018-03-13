import React from 'react';
import './SmallPost.css';

const smallPost = (props) => {
    let postContent = props.postContent;
    let maxSize = 50;
    for(let i = 0; i < postContent.length; i++){
        if( i >= maxSize && postContent.charAt(i) === ' ' )
        {
            postContent.charAt(i).replace(' ', '\n');
            maxSize += 50;
        }
    }   

    const isImage = props.image ? <div className="PostMinImage"><img src={props.image} /></div> : null;
    return (
            
        <div className="SmallPost" onClick={props.clicked}>
            <h4>Opublikował: {props.author}</h4>
            <div className="PostContent">
                <div className="Text">
                    {postContent}
                </div>
                {isImage}

            </div>
        </div>
    );
    
};

export default smallPost;