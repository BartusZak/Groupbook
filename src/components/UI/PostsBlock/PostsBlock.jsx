import React, { Component } from 'react';
import Image from '../../../assets/img/404/404.jpg';
import { PostBlockDiv } from './PostBlockStyle';
import { Link } from 'react-router-dom';
class PostsBlock extends Component {
    render(){
        return(
            <PostBlockDiv>
            <div className="post-container">
                <p className="main-post-title">Posty opublikowane przez Ciebie</p>
                <div className="main-post-title-cont">
                    <p className="group-name-title">Poczekalnia  </p>
                    <p className="main-post-date">19-12-1994 16:56</p>
                    <div className="single-post">
                        <div className="image-holder2">
                            
                            <img src={Image} alt="alt" />
                            <span className="post-title">
                                Problem z mlodszym bratem dasdsaadadad
                            </span>
                        </div>

                       
                    </div>
                 
                </div>

                

                
            
            
             
            </div>

            
            </PostBlockDiv>
        );
    }
}


export default PostsBlock;