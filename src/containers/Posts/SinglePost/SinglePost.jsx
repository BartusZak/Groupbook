import React from 'react';
import './SinglePost.css';
import Image from '../../../assets/img/memeExample/meme.png';
const singlePost = (props) => (
    <div className="SinglePost">
        <h4 className="PostHeaders">Nagłówek postu</h4>
        <div className="PostSubHeader">
            <div className="Tags">
                <span>#Dobra spraw, #lepiej #jutro bedzie futro #EloBolbemolo</span>
            </div>
            <div className="InformationContainer"v>
                <b>Tomasz Protesiuk <br/><span style={{color: 'red'}}>(Jaro1994)</span></b>
                <i className="fa fa-comment"><b className="comments-number">10</b></i>
                <span className="PostAddDate">
                    2016-12-12 16:45
                </span>           
            </div>
            <div className="PostDescription">
                <span>Opis postu jaki zostal dodany wczesniej no i tegn tego</span>
            </div>
            <div className="ImageDescHolder">
                <div className="PostImage">
                    <img src={Image} alt="Ciekawy jestem co z tego bedzie" />
                </div>
                <div className="PostSideDesc">
                    <span>Opis postu jaki zostal dodany wczesniej no i tegn tego</span>
                </div>
            </div>
            
        </div>
    </div>
 
);

export default singlePost;