import React from 'react';
import './SearchPost.css';
import Img from '../../../assets/img/404/404.jpg';
import Button from '../../UI/Button/Button';
const searchPost = props => (
    <div className="search-result">
        <div style={{backgroundImage: `url(${Img})`}} className="search-post-block">
            <p>
                <span>{props.title}</span>
                <i className="fa fa-align-center"></i>
                <b>
                    <i onClick={props.changeBlock} id={0} className="fa fa-user"></i>
                    <i onClick={props.changeBlock} id={1} className="fa fa-align-center"></i>
                    <i onClick={props.changeBlock} id={2} className="fa fa-info-circle"></i>
                </b>
            </p>
            <div className="post-animated-content">
                {props.block === "0" ? 
                    props.author ? props.author : null : null
                }
                
                {props.block === "1" ? 
                    props.content : null}
                
                {props.block === "2" ? 
                    props.content : null}
            </div>
            <Button content="Szczegóły" btnClass="circle-button"/>
        </div>
    </div>
);

export default searchPost;