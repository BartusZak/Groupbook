import React, { Component } from 'react';
import Image from '../../../../assets/img/404/404.jpg';
import { PostBlockDiv } from './PostBlockStyle';
import { Link } from 'react-router-dom';
class PostsBlock extends Component {
    render(){
        return(
            <PostBlockDiv>
            <div className="post-container">
                <p className="main-post-title">Posty opublikowane przez Ciebie</p>
                <div className="main-post-title-cont">
                    <p className="group-name-title"><span>Nazwa grupy</span><span className="more-post">dalej</span></p>
                    <div className="single-post">
                        <div className="image-holder2">
                            <span className="main-post-date">
                                19-12-1994 16:56
                            </span>
                            <img src={Image} alt="alt" />
                            <span className="post-title">
                                Problem z mlodszym bratem dasdsaadadad
                            </span>
                        </div>

                        <div className="image-holder2">
                            <span className="main-post-date">
                                19-12-1994 16:56
                            </span>
                            <img src={Image} alt="alt" />
                            <span className="post-title">
                                penetratorze
                            </span>
                        </div>
                        <div className="image-holder2">
                            <span className="main-post-date">
                                    19-12-1994 16:56
                                </span>
                                <img src={Image} alt="alt" />
                                <span className="post-title">
                                    penetratorze
                            </span>
                        </div>
                    </div>
                 
                </div>

                 <div className="main-post-title-cont">
                    <p className="group-name-title">Nazwa grupy</p>
                    <div className="single-post">
                        <div className="image-holder2">
                            <span className="main-post-date">
                                19-12-1994 16:56
                            </span>
                            <img src={Image} alt="alt" />
                            <span className="post-title">
                                Problem z mlodszym bratem dasdsaadadad
                            </span>
                        </div>

                        <div className="image-holder2">
                            <span className="main-post-date">
                                19-12-1994 16:56
                            </span>
                            <img src={Image} alt="alt" />
                            <span className="post-title">
                                penetratorze
                            </span>
                        </div>
                        <div className="image-holder2">
                            <span className="main-post-date">
                                    19-12-1994 16:56
                                </span>
                                <img src={Image} alt="alt" />
                                <span className="post-title">
                                    penetratorze
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