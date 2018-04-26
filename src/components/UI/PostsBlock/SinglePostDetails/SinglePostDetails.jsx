import React from 'react';
import Aux from 'hoc/Auxi';
import {apiPicturesUrl} from 'axios/apiPicturesUrl';
import {Post} from './SinglePostDetails.style';

const singlePostDetails = (props) => (

    <Post>
        <p className="post-title-name">{props.post.title}</p>
        <hr/>
        <p className="creation-date">{props.post.creationDate.slice(0,10) + " " + props.post.creationDate.slice(11,16)}</p>
    
        <p>{props.post.content}</p>

        {(props.post.pictures.length > 0 ?
            <img 
                src={apiPicturesUrl+props.post.pictures[0].mediumResolutionPicName} 
                onError={(e)=>{e.target.src=require('assets/img/404/error-image-generic.png')}} 
                alt="alt" />
        :
            null
        )}

    </Post>
)


export default singlePostDetails;