import React from 'react';
import Aux from 'hoc/Auxi';
import {apiPicturesUrl} from 'axios/apiPicturesUrl';
import {Post} from './SinglePostDetails.style';
import { Col, Container, Row, Footer } from 'mdbreact';

const singlePostDetails = (props) => (

    <Post>
        <Row>
            <Col>
                <p className="post-title-name">{props.post.title}</p>
                <hr/>
                <p className="creation-date">{props.post.creationDate.slice(0,10) + " " + props.post.creationDate.slice(11,16)}</p>
            </Col>
        </Row>
        <Row>
            <Col>
                <p>{props.post.content}</p>
                
                <div className="post-image-container">
                    {(props.post.pictures.length > 0 ?
                        <img 
                            style={{objectFit: "cover"}}
                            src={apiPicturesUrl+props.post.pictures[0].mediumResolutionPicName} 
                            onError={(e)=>{e.target.src=require('assets/img/404/error-image-generic.png')}} 
                            alt="alt" />
                    :
                        null
                    )}
                </div>
            </Col>
            <Col>
            
                {props.post.comments.map( (i) => {
                    return (
                            <span>{i.content}</span>
                    )  
                })}
            </Col>
        </Row>
    </Post>
)


export default singlePostDetails;